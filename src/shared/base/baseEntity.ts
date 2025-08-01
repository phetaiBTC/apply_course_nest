import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class SharedBaseEntity {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}