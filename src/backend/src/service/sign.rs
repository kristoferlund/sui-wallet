use crate::{create_derivation_path, ensure_authenticated, get_ecdsa_key_id};
use hex_literal::hex;
use ic_cdk::{
    api::msg_caller,
    management_canister::{sign_with_ecdsa, SignWithEcdsaArgs},
    update,
};
use sha2::{Digest as _, Sha256};

// secp256k1 constants for low-S normalization
const N: [u8; 32] = hex!("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
const N_OVER_2: [u8; 32] = hex!("7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0");

fn be_cmp(a: &[u8; 32], b: &[u8; 32]) -> core::cmp::Ordering {
    for i in 0..32 {
        if a[i] != b[i] {
            return if a[i] < b[i] {
                core::cmp::Ordering::Less
            } else {
                core::cmp::Ordering::Greater
            };
        }
    }
    core::cmp::Ordering::Equal
}

fn n_minus(a: &mut [u8; 32]) {
    let mut borrow = 0u16;
    for i in (0..32).rev() {
        let ai = a[i] as u16 + borrow;
        let ni = N[i] as u16;
        let t = ni.wrapping_sub(ai);
        a[i] = (t & 0xFF) as u8;
        borrow = if ai > ni { 1 } else { 0 };
    }
}

fn normalize_low_s(sig: &mut [u8]) {
    let mut s = [0u8; 32];
    s.copy_from_slice(&sig[32..64]);
    if be_cmp(&s, &N_OVER_2) == core::cmp::Ordering::Greater {
        n_minus(&mut s);
        sig[32..64].copy_from_slice(&s);
    }
}

#[update(guard = "ensure_authenticated")]
pub async fn sign(msg: Vec<u8>) -> Result<Vec<u8>, String> {
    if msg.len() != 32 {
        return Err(format!("sign expects 32-byte digest, got {}", msg.len()));
    }
    let msg_sha256 = Sha256::digest(&msg); // 32 bytes
    let mut digest = [0u8; 32];
    digest.copy_from_slice(&msg_sha256);
    let mut sig = sign_with_ecdsa(&SignWithEcdsaArgs {
        key_id: get_ecdsa_key_id(),
        derivation_path: create_derivation_path(&msg_caller()),
        message_hash: digest.to_vec(),
    })
    .await
    .map_err(|e| format!("sign_with_ecdsa failed: {e:?}"))?
    .signature; // r||s, 64 bytes
    normalize_low_s(&mut sig);
    Ok(sig)
}
