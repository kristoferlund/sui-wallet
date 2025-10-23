use crate::{create_derivation_path, ensure_authenticated, get_ecdsa_key_id};
use ic_cdk::{
    api::msg_caller,
    management_canister::{ecdsa_public_key, EcdsaPublicKeyArgs},
    update,
};

#[update(guard = "ensure_authenticated")]
pub async fn get_public_key() -> Result<Vec<u8>, String> {
    let result = ecdsa_public_key(&EcdsaPublicKeyArgs {
        key_id: get_ecdsa_key_id(),
        derivation_path: create_derivation_path(&msg_caller()),
        canister_id: None,
    })
    .await
    .map_err(|e| format!("ecdsa_public_key failed: {e:?}"))?;
    Ok(result.public_key)
}
