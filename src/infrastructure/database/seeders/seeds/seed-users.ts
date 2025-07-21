import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { hashPassword } from 'src/shared/utils/bcrypt.util';
@Injectable()
export class UsersSeeder {
    constructor() { }

    async seed(manager: EntityManager) {
        const _respository = manager.getRepository(UserEntity);
        const items = [
            {
                name: 'super admin',
                email: 'super_admin@gmail.com',
                surname: 'super admin',
                password: await hashPassword('super@1234'),
                is_verified: true
            },
            {
                name: 'admin',
                email: 'admin@gmail.com',
                surname: 'admin',
                password: await hashPassword('admin@1234'),
                is_verified: true

            },
            {
                name: 'user',
                email: 'user@gmail.com',
                surname: 'user',
                password: await hashPassword('user@1234'),
                is_verified: true
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
