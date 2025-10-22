import { useQuery } from '@tanstack/react-query';
import { useBackendActor } from '@/main';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import useSuiAddress from './useSuiAddress';

export default function useSuiBalance() {
  const { actor: backend, isAuthenticated } = useBackendActor();
  const { data: pk } = useSuiAddress();

  let address = undefined;
  if (pk) {
    address = pk.toSuiAddress();
  }

  return useQuery({
    queryKey: ['balance', address],
    queryFn: async () => {
      try {
        if (!address) throw new Error("Invalid address");

        // Create a client connected to testnet
        const client = new SuiClient({ url: getFullnodeUrl('testnet') });

        // Get coins owned by an address
        const coins = await client.getCoins({
          owner: address
        });

        // Currently, we only care about the main SUI coinType
        for (const coin of coins.data) {
          if (coin.coinType === "0x2::sui::SUI") {
            return coin.balance
          }
        }

        return "0";
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    enabled: !!backend && !!isAuthenticated && !!address,
  });
}
