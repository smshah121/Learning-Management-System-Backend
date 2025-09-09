import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/user/entities/user.entity';
import { Course } from './src/courses/entities/course.entity';
import { Lecture } from './src/lectures/entities/lecture.entity';
import { Enrollment } from './src/enrollments/entities/enrollment.entity';
import { Announcement } from './src/announcement/entities/announcement.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Course, Lecture, Enrollment, Announcement],
  migrations: ["src/migrations/*.ts"],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: false,
});
