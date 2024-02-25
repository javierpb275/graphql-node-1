export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
  address: Address;
  nextUser: User;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};
export type Geo = {
  lat: string;
  lng: string;
};
export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
