import { useQuery } from "@tanstack/react-query";
import useHandleAgentError from "./useHandleAgentError";
import { useInternetIdentity } from "ic-use-internet-identity";
import { useBackendActor } from "@/main";

export default function useBtcAddress() {
  const { actor: backend } = useBackendActor();
  const { handleAgentError } = useHandleAgentError();
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  // This query caches the generated Bitcoin address in local storage
  // to minimize the number of calls to the backend and to improve UX.
  return useQuery({
    queryKey: ['address', principal],
    queryFn: async () => {
      if (!principal) {
        throw new Error("Principal is required.");
      }

      const cacheKey = `btcAddress-${principal.toText()}`;
      const cachedAddress = localStorage.getItem(cacheKey);

      if (cachedAddress) {
        // Return cached address if available
        return cachedAddress;
      }

      try {
        const result = await backend?.get_address([principal]);

        if (result === undefined) {
          throw new Error("Undefined address returned.");
        }

        if ('Err' in result) {
          throw new Error(result.Err);
        }

        const address = result.Ok;

        // Cache the fetched address
        localStorage.setItem(cacheKey, address);

        return address;
      } catch (e) {
        handleAgentError(e);
        console.error(e);
        throw new Error("Invalid address returned.");
      }
    },
    enabled: !!backend && !!principal,
  });
}
