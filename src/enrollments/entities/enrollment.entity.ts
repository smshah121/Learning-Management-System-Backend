import { Course } from "src/courses/entities/course.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.enrollments)
  student: User;

  @ManyToOne(() => Course, course => course.enrollments, {
    onDelete: "CASCADE"
  })
  course: Course;

  @CreateDateColumn()
  enrolledAt: Date;
}
