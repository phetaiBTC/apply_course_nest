export class User {
  constructor(
    public readonly id: number | null,
    public name: string,
    public email: string,
    public surname: string,
    public password: string,
    public is_verified: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) { }
}
