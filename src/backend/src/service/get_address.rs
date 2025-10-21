use crate::{create_derivation_path, ensure_authenticated, get_ecdsa_key_id};
use blake2b_simd::Params;
use candid::Principal;
use ic_cdk::{
    api::msg_caller,
    management_canister::{ecdsa_public_key, EcdsaPublicKeyArgs},
    update,
};

#[update(guard = "ensure_authenticated")]
pub async fn get_address(principal: Option<Principal>) -> Result<String, String> {
    let principal = principal.unwrap_or_else(msg_caller);

    let result = ecdsa_public_key(&EcdsaPublicKeyArgs {
        key_id: get_ecdsa_key_id(),
        derivation_path: create_derivation_path(&principal),
        canister_id: None,
    })
    .await
    .map_err(|e| format!("ecdsa_public_key failed: {e:?}"))?;

    let pk = result.public_key; // SEC1 compressed (33 bytes)
    if pk.len() != 33 {
        return Err(format!(
            "expected 33-byte compressed pubkey, got {}",
            pk.len()
        ));
    }

    // Sui address = blake2b-256( 0x01 || compressed_pubkey )  where 0x01 = secp256k1
    let digest = Params::new()
        .hash_length(32)
        .to_state()
        .update(&[0x01])
        .update(&pk)
        .finalize();

    Ok(format!("0x{}", hex::encode(digest.as_bytes())))
}
