import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type BytesResult = { 'Ok' : Uint8Array | number[] } |
  { 'Err' : string };
export type PublicKey = Uint8Array | number[];
export type PublicKeyResult = { 'Ok' : PublicKey } |
  { 'Err' : string };
export interface _SERVICE {
  'get_public_key' : ActorMethod<[], PublicKeyResult>,
  'sign' : ActorMethod<[Uint8Array | number[]], BytesResult>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
