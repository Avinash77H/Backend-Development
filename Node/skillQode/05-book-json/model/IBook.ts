export interface IBook{
  title:string,
  isbn:string,
  downloadable:boolean,
  no_of_reviews:number,
  tags:string[],
  language:string[],
  author:Author
} 

export interface Author{
  name:string,
  callname:string,
  profile:Profile
}

export interface Profile{
  exp:number,
  courses:number,
  books:number
}