// import { Injectable } from '@nestjs/common';
// import { PermissionsEntity } from 'src/infrastructure/typeorm/permissions.orm-entity';
// import { EntityManager } from 'typeorm';
// import * as path from 'path';
// import { glob } from 'glob';

// @Injectable()
// export class PermissionSeeder {
//   constructor() { }

//   async seed(manager: EntityManager) {
//     const repository = manager.getRepository(PermissionsEntity);

//     const baseDir = 'src/modules';
//     const pattern = `${baseDir}/**/application/use-cases/**/*.use-case.ts`;
//     const files = await glob.sync(pattern);

//     const permissionNames: Set<string> = new Set();

//     for (const file of files) {
//       const filename = path.basename(file);
//       if (filename.endsWith('.use-case.ts')) {
//         const name = filename.replace('.use-case.ts', '').replace(/-/g, '_');
//         permissionNames.add(name);
//       }
//     }
//     let idCounter = 1;
//     for (const name of permissionNames) {
//       // const exists = await repository.findOneBy({ name });
//       // if (!exists) {
//       const permission = repository.create({
//         id: idCounter++,
//         name,
//         display_name: this.formatDisplayName(name),
//       });
//       await repository.save(permission);
//       //   console.log(`✅ Created: ${name}`);
//       // } else {
//       //   console.log(`⏩ Already exists: ${name}`);
//       // }
//     }

//     console.log('🎉 Permission seeding complete.');
//   }

//   private formatDisplayName(name: string): string {
//     // แปลง create_student -> CREATE STUDENT
//     return name.replace(/_/g, ' ').toUpperCase();
//   }
// }


import { Injectable } from '@nestjs/common';
import { PermissionsEntity } from 'src/infrastructure/typeorm/permissions.orm-entity';
import { EntityManager } from 'typeorm';
import * as path from 'path';
import { glob } from 'glob';

@Injectable()
export class PermissionSeeder {
  constructor() { }

  async seed(manager: EntityManager) {
    const repository = manager.getRepository(PermissionsEntity);

    const baseDir = 'src/modules';
    const pattern = `${baseDir}/**/application/use-cases/**/*.use-case.ts`;
    const files = await glob.sync(pattern);

    const permissionNames: Set<string> = new Set();

    for (const file of files) {
      const filename = path.basename(file);
      if (filename.endsWith('.use-case.ts')) {
        const name = filename.replace('.use-case.ts', '').replace(/-/g, '_');
        permissionNames.add(name);
      }
    }

    // วิธีที่ 1: ตรวจสอบก่อนสร้าง (แนะนำ)
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

    // วิธีที่ 2: ใช้ upsert (ทางเลือก)
    /*
    const permissionsToUpsert = Array.from(permissionNames).map(name => ({
      name,
      display_name: this.formatDisplayName(name),
    }));

    await repository.upsert(permissionsToUpsert, ['name']);
    console.log(`✅ Upserted ${permissionsToUpsert.length} permissions`);
    */

    console.log('🎉 Permission seeding complete.');
  }

  private formatDisplayName(name: string): string {
    // แปลง create_student -> CREATE STUDENT
    return name.replace(/_/g, ' ').toUpperCase();
  }
}