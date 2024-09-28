import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Part {
  'id' : PartId,
  'name' : string,
  'profileId' : ProfileId,
  'description' : string,
  'imageUrl' : string,
}
export type PartId = bigint;
export interface Profile {
  'id' : ProfileId,
  'model' : string,
  'name' : string,
  'year' : bigint,
  'description' : string,
}
export type ProfileId = bigint;
export interface _SERVICE {
  'addPart' : ActorMethod<[ProfileId, string, string, string], [] | [PartId]>,
  'createProfile' : ActorMethod<[string, string, bigint, string], ProfileId>,
  'getPartsForProfile' : ActorMethod<[ProfileId], Array<Part>>,
  'getProfile' : ActorMethod<[ProfileId], [] | [Profile]>,
  'updateProfile' : ActorMethod<
    [ProfileId, string, string, bigint, string],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
