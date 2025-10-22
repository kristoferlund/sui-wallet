import ReceiveButton from './receive-button';
import SendButton from './send-button';
import { BtcAddress } from './btc-address';
import Logout from './logout';
import suiLogo from "../assets/sui.svg";
import { Balance } from './balance';

export default function Wallet() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="rounded-full bg-primary p-1">
            <img src={suiLogo} className='w-5 h-5' />
          </div>
          <h3>Wallet</h3>
        </div>
        <Logout />
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-muted-foreground">Your address:</div>
        <BtcAddress />
      </div>

      <Balance />

      <div className="flex gap-5">
        <ReceiveButton />
        <SendButton />
      </div>
    </section>
  );
}
