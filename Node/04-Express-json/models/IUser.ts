export interface IUser{
  id:number;
  name:string;
  username:string;
  email:string;
  address:Address;
  phone:string;
  website:string;
  company:Company;
}

export interface Address{
  street:string;
  suite:string;
  city:string;
  zipcode:string;
  geo:Geolocation;
}

export interface Geo{
  lat:string;
  lng:string;
}

export interface Company{
  name:string;
  catchPhase:string;
  bs:string;
}