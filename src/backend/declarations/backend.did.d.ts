import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AddressResult = { 'Ok' : string } |
  { 'Err' : string };
export interface _SERVICE {
  'get_address' : ActorMethod<[[] | [Principal]], AddressResult>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
