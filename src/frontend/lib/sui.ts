import { ActorSubclass } from "@dfinity/agent";
import { PublicKey, SignatureScheme, Signer } from "@mysten/sui/cryptography";
import { _SERVICE } from "src/backend/declarations/backend.did";

export function formatSui(balance: string): string {
  const n = Number(balance) / 1e9;
  return parseFloat(n.toFixed(3)).toString();
}

export class IcpSigner extends Signer {
  private readonly publicKey: PublicKey;
  private readonly backend: ActorSubclass<_SERVICE>;

  constructor(publicKey: PublicKey, backend: ActorSubclass<_SERVICE>) {
    super();
    this.publicKey = publicKey;
    this.backend = backend;
  }

  async sign(bytes: Uint8Array): Promise<Uint8Array<ArrayBuffer>> {
    const res = await this.backend.sign(Array.from(bytes));
    if ("Err" in res) throw new Error(res.Err);
    const sig = new Uint8Array(res.Ok);
    return sig as unknown as Uint8Array<ArrayBuffer>;
  }

  getKeyScheme(): SignatureScheme {
    return "Secp256k1";
  }

  getPublicKey(): PublicKey {
    return this.publicKey;
  }
}

