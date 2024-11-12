import UserRole from './UserRole';

export default class User {
  constructor(
    public userId?: number,
    public id?: number,
    public username?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public profilPic?: string,
    public userRoles?: UserRole[]
  ) {}
}
