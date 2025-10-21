export const idlFactory = ({ IDL }) => {
  const AddressResult = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  return IDL.Service({
    'get_address' : IDL.Func([IDL.Opt(IDL.Principal)], [AddressResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
