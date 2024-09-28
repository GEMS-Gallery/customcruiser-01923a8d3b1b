export const idlFactory = ({ IDL }) => {
  const ProfileId = IDL.Nat;
  const PartId = IDL.Nat;
  const Part = IDL.Record({
    'id' : PartId,
    'name' : IDL.Text,
    'profileId' : ProfileId,
    'description' : IDL.Text,
    'imageUrl' : IDL.Text,
  });
  const Profile = IDL.Record({
    'id' : ProfileId,
    'model' : IDL.Text,
    'name' : IDL.Text,
    'year' : IDL.Nat,
    'description' : IDL.Text,
  });
  return IDL.Service({
    'addPart' : IDL.Func(
        [ProfileId, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Opt(PartId)],
        [],
      ),
    'createProfile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text],
        [ProfileId],
        [],
      ),
    'getPartsForProfile' : IDL.Func([ProfileId], [IDL.Vec(Part)], ['query']),
    'getProfile' : IDL.Func([ProfileId], [IDL.Opt(Profile)], ['query']),
    'updateProfile' : IDL.Func(
        [ProfileId, IDL.Text, IDL.Text, IDL.Nat, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
