"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const user_entity_1 = require("./src/user/entities/user.entity");
const course_entity_1 = require("./src/courses/entities/course.entity");
const lecture_entity_1 = require("./src/lectures/entities/lecture.entity");
const enrollment_entity_1 = require("./src/enrollments/entities/enrollment.entity");
const announcement_entity_1 = require("./src/announcement/entities/announcement.entity");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [user_entity_1.User, course_entity_1.Course, lecture_entity_1.Lecture, enrollment_entity_1.Enrollment, announcement_entity_1.Announcement],
    migrations: ["src/migrations/*.ts"],
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map