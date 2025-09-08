import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { LecturesModule } from './lectures/lectures.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { User } from './user/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { Lecture } from './lectures/entities/lecture.entity';
import { Enrollment } from './enrollments/entities/enrollment.entity';
import { Announcement } from './announcement/entities/announcement.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes .env available everywhere
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Course, Lecture, Enrollment, Announcement],
        synchronize: false,
        ssl: config.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
      }),
    }),
    UserModule,
    AuthModule,
    CoursesModule,
    LecturesModule,
    EnrollmentsModule,
    AnnouncementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
