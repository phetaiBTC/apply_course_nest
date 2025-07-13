export class User {
  constructor(
    public readonly id: number | null,
    public name: string,
    public email: string,
    public surname: string,
    public password: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) { }

  // changeName(newName: string) {
  //   this.name = newName;
  // }
}
