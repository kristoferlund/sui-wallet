mod service;

use candid::Principal;
use ic_cdk::api::msg_caller;
use ic_cdk::{
    export_candid,
    management_canister::{EcdsaCurve, EcdsaKeyId},
    trap,
};
use serde_bytes::ByteBuf;

/// Ensures that the caller is authenticated (not anonymous).
pub fn ensure_authenticated() -> Result<(), String> {
    if msg_caller() == Principal::anonymous() {
        Err("Anonymous principal not allowed to make calls.".into())
    } else {
        Ok(())
    }
}

// ICP uses different ECDSA key names for mainnet and local
// development.
fn get_ecdsa_key_id() -> EcdsaKeyId {
    #[allow(clippy::option_env_unwrap)]
    let dfx_network = option_env!("DFX_NETWORK").unwrap();
    EcdsaKeyId {
        curve: EcdsaCurve::Secp256k1,
        name: match dfx_network {
            "local" => "dfx_test_key".to_string(),
            "ic" => "key_1".to_string(),
            _ => trap("Invalid dfx_network"),
        },
    }
}

// The derivation path determines the Ethereum address generated
// by the signer.
fn create_derivation_path(principal: &Principal) -> Vec<Vec<u8>> {
    const SCHEMA_V1: u8 = 1;
    [
        ByteBuf::from(vec![SCHEMA_V1]),
        ByteBuf::from(principal.as_slice().to_vec()),
    ]
    .iter()
    .map(|x| x.to_vec())
    .collect()
}

export_candid!();
