import Role from './Role';

export default class UserRole {
  constructor(
    public userId?: number,
    public roleId?: number,
    public role?: Role
  ) {}
}
