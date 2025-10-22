export const idlFactory = ({ IDL }) => {
  const PublicKey = IDL.Vec(IDL.Nat8);
  const PublicKeyResult = IDL.Variant({ 'Ok' : PublicKey, 'Err' : IDL.Text });
  const BytesResult = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Nat8),
    'Err' : IDL.Text,
  });
  return IDL.Service({
    'get_public_key' : IDL.Func([], [PublicKeyResult], []),
    'sign' : IDL.Func([IDL.Vec(IDL.Nat8)], [BytesResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
