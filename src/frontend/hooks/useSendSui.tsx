
import useSuiAddress from '@/hooks/useSuiAddress';
import { useMutation } from '@tanstack/react-query';
import { useBackendActor } from '@/main';
import { Transaction } from '@mysten/sui/transactions';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { IcpSigner } from '@/lib/sui';

export default function useSendSui() {
  const { data: pk } = useSuiAddress();
  const { actor: backend } = useBackendActor();

  return useMutation({
    mutationFn: async ({ to, amount }: { to: string; amount: string }) => {
      if (!backend) {
        throw new Error('backend actor not initialized');
      }

      if (!pk) {
        throw new Error("SUI pubkey not available.")
      }

      try {
        const signer = new IcpSigner(pk, backend);
        const tx = new Transaction();
        const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(amount)]);
        tx.transferObjects([coin], tx.pure.address(to));
        const client = new SuiClient({ url: getFullnodeUrl("testnet") });
        return client.signAndExecuteTransaction({ signer, transaction: tx });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  });
};
