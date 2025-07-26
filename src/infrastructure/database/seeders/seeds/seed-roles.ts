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
            {
                id: 2,
                name: 'student',
                display_name: 'Student',
                permissions: [
                    {
                        "id": 1,
                        "name": "get_one_user",
                        "display_name": "GET ONE USER"
                    },
                    {
                        "id": 2,
                        "name": "get_all_user",
                        "display_name": "GET ALL USER"
                    },
                    {
                        "id": 8,
                        "name": "get_one_teacher",
                        "display_name": "GET ONE TEACHER"
                    },
                    {
                        "id": 9,
                        "name": "get_all_teacher",
                        "display_name": "GET ALL TEACHER"
                    },
                    {
                        "id": 15,
                        "name": "get_one_student_education",
                        "display_name": "GET ONE STUDENT EDUCATION"
                    },
                    {
                        "id": 16,
                        "name": "update_student_education",
                        "display_name": "UPDATE STUDENT EDUCATION"
                    },
                    {
                        "id": 17,
                        "name": "get_one_role",
                        "display_name": "GET ONE ROLE"
                    },
                    {
                        "id": 18,
                        "name": "get_all_role",
                        "display_name": "GET ALL ROLE"
                    },
                    {
                        "id": 24,
                        "name": "get_all_permssion",
                        "display_name": "GET ALL PERMSSION"
                    },
                    {
                        "id": 25,
                        "name": "create_student",
                        "display_name": "CREATE STUDENT"
                    },
                    {
                        "id": 26,
                        "name": "get_one_course_completion_records",
                        "display_name": "GET ONE COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 27,
                        "name": "get_all_course_completion_records",
                        "display_name": "GET ALL COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 33,
                        "name": "get_one_course_category",
                        "display_name": "GET ONE COURSE CATEGORY"
                    },
                    {
                        "id": 34,
                        "name": "get_all_course_category",
                        "display_name": "GET ALL COURSE CATEGORY"
                    },
                    {
                        "id": 40,
                        "name": "get_one_course",
                        "display_name": "GET ONE COURSE"
                    },
                    {
                        "id": 41,
                        "name": "get_all_course",
                        "display_name": "GET ALL COURSE"
                    },
                    {
                        "id": 48,
                        "name": "get_one_apply_courses",
                        "display_name": "GET ONE APPLY COURSES"
                    },
                    {
                        "id": 49,
                        "name": "get_all_apply_courses",
                        "display_name": "GET ALL APPLY COURSES"
                    },
                    {
                        "id": 50,
                        "name": "update_apply_courses",
                        "display_name": "UPDATE APPLY COURSES"
                    },
                    {
                        "id": 51,
                        "name": "soft_delete_apply_courses",
                        "display_name": "SOFT DELETE APPLY COURSES"
                    },
                    {
                        "id": 52,
                        "name": "restore_apply_courses",
                        "display_name": "RESTORE APPLY COURSES"
                    },
                    {
                        "id": 53,
                        "name": "hard_delete_apply_courses",
                        "display_name": "HARD DELETE APPLY COURSES"
                    },
                    {
                        "id": 54,
                        "name": "create_apply_courses",
                        "display_name": "CREATE APPLY COURSES"
                    },
                    {
                        "id": 55,
                        "name": "hard_delete_student_education",
                        "display_name": "HARD DELETE STUDENT EDUCATION"
                    },
                    {
                        "id": 56,
                        "name": "create_student_education",
                        "display_name": "CREATE STUDENT EDUCATION"
                    },
                    {
                        "id": 57,
                        "name": "get_one_student",
                        "display_name": "GET ONE STUDENT"
                    },
                    {
                        "id": 58,
                        "name": "get_all_student",
                        "display_name": "GET ALL STUDENT"
                    },
                    {
                        "id": 59,
                        "name": "update_student",
                        "display_name": "UPDATE STUDENT"
                    },
                    {
                        "id": 63,
                        "name": "get_email_user",
                        "display_name": "GET EMAIL USER"
                    }
                ]
            },
            {
                id: 3, name: 'teacher', display_name: 'TEACHER',
                permissions: [
                    {
                        "id": 1,
                        "name": "get_one_user",
                        "display_name": "GET ONE USER"
                    },
                    {
                        "id": 2,
                        "name": "get_all_user",
                        "display_name": "GET ALL USER"
                    },
                    {
                        "id": 8,
                        "name": "get_one_teacher",
                        "display_name": "GET ONE TEACHER"
                    },
                    {
                        "id": 9,
                        "name": "get_all_teacher",
                        "display_name": "GET ALL TEACHER"
                    },
                    {
                        "id": 10,
                        "name": "update_teacher",
                        "display_name": "UPDATE TEACHER"
                    },
                    {
                        "id": 14,
                        "name": "create_teacher",
                        "display_name": "CREATE TEACHER"
                    },
                    {
                        "id": 15,
                        "name": "get_one_student_education",
                        "display_name": "GET ONE STUDENT EDUCATION"
                    },
                    {
                        "id": 16,
                        "name": "update_student_education",
                        "display_name": "UPDATE STUDENT EDUCATION"
                    },
                    {
                        "id": 17,
                        "name": "get_one_role",
                        "display_name": "GET ONE ROLE"
                    },
                    {
                        "id": 18,
                        "name": "get_all_role",
                        "display_name": "GET ALL ROLE"
                    },
                    {
                        "id": 24,
                        "name": "get_all_permssion",
                        "display_name": "GET ALL PERMSSION"
                    },
                    {
                        "id": 25,
                        "name": "create_student",
                        "display_name": "CREATE STUDENT"
                    },
                    {
                        "id": 26,
                        "name": "get_one_course_completion_records",
                        "display_name": "GET ONE COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 27,
                        "name": "get_all_course_completion_records",
                        "display_name": "GET ALL COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 28,
                        "name": "update_course_completion_records",
                        "display_name": "UPDATE COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 29,
                        "name": "soft_delete_course_completion_records",
                        "display_name": "SOFT DELETE COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 30,
                        "name": "restore_course_completion_records",
                        "display_name": "RESTORE COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 31,
                        "name": "hard_delete_course_completion_records",
                        "display_name": "HARD DELETE COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 32,
                        "name": "create_course_completion_records",
                        "display_name": "CREATE COURSE COMPLETION RECORDS"
                    },
                    {
                        "id": 33,
                        "name": "get_one_course_category",
                        "display_name": "GET ONE COURSE CATEGORY"
                    },
                    {
                        "id": 34,
                        "name": "get_all_course_category",
                        "display_name": "GET ALL COURSE CATEGORY"
                    },
                    {
                        "id": 35,
                        "name": "update_course_category",
                        "display_name": "UPDATE COURSE CATEGORY"
                    },
                    {
                        "id": 36,
                        "name": "soft_delete_course_category",
                        "display_name": "SOFT DELETE COURSE CATEGORY"
                    },
                    {
                        "id": 37,
                        "name": "restore_course_category",
                        "display_name": "RESTORE COURSE CATEGORY"
                    },
                    {
                        "id": 38,
                        "name": "hard_delete_course_category",
                        "display_name": "HARD DELETE COURSE CATEGORY"
                    },
                    {
                        "id": 39,
                        "name": "create_course_category",
                        "display_name": "CREATE COURSE CATEGORY"
                    },
                    {
                        "id": 40,
                        "name": "get_one_course",
                        "display_name": "GET ONE COURSE"
                    },
                    {
                        "id": 41,
                        "name": "get_all_course",
                        "display_name": "GET ALL COURSE"
                    },
                    {
                        "id": 42,
                        "name": "update_course",
                        "display_name": "UPDATE COURSE"
                    },
                    {
                        "id": 43,
                        "name": "soft_delete_course",
                        "display_name": "SOFT DELETE COURSE"
                    },
                    {
                        "id": 44,
                        "name": "restore_course",
                        "display_name": "RESTORE COURSE"
                    },
                    {
                        "id": 45,
                        "name": "hard_delete_course",
                        "display_name": "HARD DELETE COURSE"
                    },
                    {
                        "id": 46,
                        "name": "create_course",
                        "display_name": "CREATE COURSE"
                    },
                    {
                        "id": 48,
                        "name": "get_one_apply_courses",
                        "display_name": "GET ONE APPLY COURSES"
                    },
                    {
                        "id": 49,
                        "name": "get_all_apply_courses",
                        "display_name": "GET ALL APPLY COURSES"
                    },
                    {
                        "id": 50,
                        "name": "update_apply_courses",
                        "display_name": "UPDATE APPLY COURSES"
                    },
                    {
                        "id": 51,
                        "name": "soft_delete_apply_courses",
                        "display_name": "SOFT DELETE APPLY COURSES"
                    },
                    {
                        "id": 52,
                        "name": "restore_apply_courses",
                        "display_name": "RESTORE APPLY COURSES"
                    },
                    {
                        "id": 53,
                        "name": "hard_delete_apply_courses",
                        "display_name": "HARD DELETE APPLY COURSES"
                    },
                    {
                        "id": 54,
                        "name": "create_apply_courses",
                        "display_name": "CREATE APPLY COURSES"
                    },
                    {
                        "id": 55,
                        "name": "hard_delete_student_education",
                        "display_name": "HARD DELETE STUDENT EDUCATION"
                    },
                    {
                        "id": 56,
                        "name": "create_student_education",
                        "display_name": "CREATE STUDENT EDUCATION"
                    },
                    {
                        "id": 57,
                        "name": "get_one_student",
                        "display_name": "GET ONE STUDENT"
                    },
                    {
                        "id": 58,
                        "name": "get_all_student",
                        "display_name": "GET ALL STUDENT"
                    },
                    {
                        "id": 59,
                        "name": "update_student",
                        "display_name": "UPDATE STUDENT"
                    },
                    {
                        "id": 60,
                        "name": "soft_delete_student",
                        "display_name": "SOFT DELETE STUDENT"
                    },
                    {
                        "id": 61,
                        "name": "restore_student",
                        "display_name": "RESTORE STUDENT"
                    },
                    {
                        "id": 62,
                        "name": "hard_delete_student",
                        "display_name": "HARD DELETE STUDENT"
                    },
                    {
                        "id": 63,
                        "name": "get_email_user",
                        "display_name": "GET EMAIL USER"
                    }
                ]
            }
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
