import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { hashPassword } from 'src/utils/bcrypt.util';
@Injectable()
export class UsersSeeder {
    constructor() { }

    async seed(manager: EntityManager) {
        const _respository = manager.getRepository(UserEntity);
        const items = [
            {
                username: 'super admin',
                email: 'super_admin@gmail.com',
                password: await hashPassword('super@1234'),
            },
            {
                username: 'admin',
                email: 'admin@gmail.com',
                password: await hashPassword('admin@1234'),
            },
            {
                username: 'user',
                email: 'user@gmail.com',
                password: await hashPassword('user@1234'),
            },
        ];

        for (const item of items) {
            const existingItem = await _respository.findOne({
                where: { email: item.email },
            });
            if (!existingItem) {
                const items = _respository.create(item);
                await _respository.save(items);
            }
        }
    }
}
