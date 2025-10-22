import { InfoIcon } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export default function WalletWarning() {
  return (
    <Alert className="w-[400px] mb-5">

      <InfoIcon className="w-4 h-4" />
      <AlertDescription>
        <div className="flex flex-col gap-2">
          This is an example application, a multiuser SUI wallet on the
          Internet Computer (ICP).
          <div className="flex items-center gap-2">
            Source code:
            <a
              href="http://github.com/kristoferlund/sui-wallet"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              sui_wallet
            </a>
          </div>
        </div>
      </AlertDescription>
    </Alert>

  );
}
