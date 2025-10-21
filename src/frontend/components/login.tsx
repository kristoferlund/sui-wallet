import { useInternetIdentity } from 'ic-use-internet-identity';
import { Button } from './ui/button';
import suiLogo from "../assets/sui.svg";

export default function LoginButton() {
  const { login, status } = useInternetIdentity();

  const disabled = status === 'logging-in' || status === 'success';
  const text =
    status === 'logging-in'
      ? 'Signing in...'
      : 'Sign in with Internet Identity';

  return (
    <section className="flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <div className="rounded-full bg-primary p-1">
          <img src={suiLogo} className='w-5 h-5' />
        </div>
        <h3>Wallet</h3>
      </div>
      <Button onClick={login} disabled={disabled}>
        {text}
      </Button>
    </section>
  );
}
