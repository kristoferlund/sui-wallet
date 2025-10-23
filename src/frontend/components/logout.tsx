import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useInternetIdentity } from 'ic-use-internet-identity';
import { useBackendActor } from '@/main';

export default function Logout() {
  const { clear } = useInternetIdentity();
  const { reset } = useBackendActor();

  return (
    <Button variant="ghost" size="icon" onClick={() => {
      clear();
      reset();
    }}>
      <LogOut className="w-4 h-4" />
    </Button>
  );
}
