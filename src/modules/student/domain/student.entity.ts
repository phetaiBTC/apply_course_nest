export class Student {
  constructor(
    public data:{
        id?: number | null,
        name: string,
        email: string,
        surname: string,
        password: string,
        birth_date?: Date | null,
        gender?: string | null,
        districtId?: number | null,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date | null
    }
  ) { }
}