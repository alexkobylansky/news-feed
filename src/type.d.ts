declare interface IUser {
  _id: number;
  name: string;
  surname: string;
  avatar: string;
  username: string;
  password: string;
}

declare interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}