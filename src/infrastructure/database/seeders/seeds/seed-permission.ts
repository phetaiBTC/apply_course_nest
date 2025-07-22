import { Injectable } from '@nestjs/common';
import { PermissionsEntity } from 'src/infrastructure/typeorm/permissions.orm-entity';
import { EntityManager } from 'typeorm';
import * as path from 'path';
import { glob } from 'glob';

@Injectable()
export class PermissionSeeder {
  constructor() {}

  async seed(manager: EntityManager) {
    const repository = manager.getRepository(PermissionsEntity);

    const baseDir = path.resolve('src/modules');
    const pattern = path.join(baseDir, '**/application/use-cases/**/**/*.use-case.ts');
    const files = await glob.sync(pattern);

    const permissionNames: Set<string> = new Set();

    for (const file of files) {
      const filename = path.basename(file);
      if (filename.endsWith('.use-case.ts')) {
        const name = filename.replace('.use-case.ts', '').replace(/-/g, '_');
        permissionNames.add(name);
      }
    }

    for (const name of permissionNames) {
      const exists = await repository.findOneBy({ name });
      if (!exists) {
        const permission = repository.create({
          name,
          display_name: this.formatDisplayName(name),
        });
        await repository.save(permission);
        console.log(`✅ Created: ${name}`);
      } else {
        console.log(`⏩ Already exists: ${name}`);
      }
    }

    console.log('🎉 Permission seeding complete.');
  }

  private formatDisplayName(name: string): string {
    // แปลง create_student -> CREATE STUDENT
    return name.replace(/_/g, ' ').toUpperCase();
  }
}
