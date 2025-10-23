import { useEffect } from "react";
import { useInternetIdentity } from "ic-use-internet-identity";
import { useBackendActor } from "./main";

export default function AuthGuard() {
  const { identity } = useInternetIdentity();
  const { authenticate } = useBackendActor();

  useEffect(() => {
    if (!identity) return;
    authenticate(identity);
  }, [identity, authenticate])

  return null;
}

