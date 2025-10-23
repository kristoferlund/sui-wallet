import { useEffect } from "react";
import { useInternetIdentity } from "ic-use-internet-identity";
import { useBackendActor } from "./main";

export default function AuthGuard() {
  const { identity } = useInternetIdentity();
  const { authenticate, reset } = useBackendActor();

  useEffect(() => {
    if (identity) {
      authenticate(identity);
      return;
    }
    reset();
  }, [identity, authenticate, reset])

  return null;
}

