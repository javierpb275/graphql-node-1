export type User = {
  id: number;
  name: String;
  username: String;
  email: String;
  phone: String;
  website: String;
  company: Company;
  address: Address;
  nextUser: User;
};

export type Company = {
  name: String;
  catchPhrase: String;
  bs: String;
};
export type Geo = {
  lat: String;
  lng: String;
};
export type Address = {
  street: String;
  suite: String;
  city: String;
  zipcode: String;
  geo: Geo;
};
