import { AppDataSource } from "../data-source";
// import { seedDistricts } from "./district.seed";
// import { seedProvinces } from "./province.seed";
// import { seedRoles } from "./role.seed";
// import { seedUsers } from "./user.seed";

AppDataSource.initialize()
    .then(async (dataSource) => {
        console.log('🌱 Seeding started...');
        // await seedProvinces(dataSource);
        // await seedDistricts(dataSource);
        // await seedRoles(dataSource);
        // await seedUsers(dataSource);
        console.log('✅ Seeding finished.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Seeding error', error);
        process.exit(1);
    });
