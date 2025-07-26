import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { RoleEntity } from 'src/infrastructure/typeorm/role.orm-entity';
import { PermissionsEntity } from 'src/infrastructure/typeorm/permissions.orm-entity';
@Injectable()
export class RolesSeeder {
    constructor() { }

    async seed(manager: EntityManager) {
        const _respository = manager.getRepository(RoleEntity);
        const permission = manager.getRepository(PermissionsEntity);
        const AllPermissions = await permission.find();
        const items = [
            { id: 1, name: 'super_admin', display_name: 'Super Admin', permissions: AllPermissions },
        ];

        for (const item of items) {
            const existingItem = await _respository.findOne({ where: { name: item.name } });
            if (!existingItem) {
                const role = _respository.create(item);
                await _respository.save(role);
                console.log(`✅ Created Role: ${item.name}`);

            }
            else {
                console.log(`⏩ Already exists: ${item.name}`);
            }
        }

        console.log('🎉 Role seeding complete.');
    }
}
