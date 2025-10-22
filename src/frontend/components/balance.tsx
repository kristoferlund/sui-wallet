import useSuiBalance from '@/hooks/useSuiBalance';
import { Skeleton } from './ui/skeleton';
import { formatSui } from '@/lib/sui';

export function Balance() {
  const {
    data: balance,
    isPending: isFetchingBalance,
    isError,
  } = useSuiBalance();

  if (isFetchingBalance) {
    return <Skeleton className="w-full h-14" />;
  }

  if (isError) {
    return (
      <div className="text-4xl font-semibold bg-destructive/30 rounded-lg p-2 text-destructive-foreground">
        Couldn't get wallet balance.
      </div>
    );
  }

  return (
    <div className="text-4xl font-semibold">
      {formatSui(balance)} SUI
    </div>
  );
}
