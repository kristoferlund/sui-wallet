import { useQuery } from "@tanstack/react-query";
import { useInternetIdentity } from "ic-use-internet-identity";
import { useBackendActor } from "@/main";
import { Secp256k1PublicKey } from "@mysten/sui/keypairs/secp256k1"
export default function useSuiAddress() {
  const { actor: backend, isAuthenticated } = useBackendActor();
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  return useQuery({
    queryKey: ['address', principal],
    queryFn: async () => {
      try {
        const result = await backend?.get_public_key();

        if (result === undefined) {
          throw new Error("Undefined address returned.");
        }

        if ('Err' in result) {
          throw new Error(result.Err);
        }

        const pk = new Secp256k1PublicKey(result.Ok);
        return pk;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    enabled: !!backend && !!isAuthenticated,
  });
}
