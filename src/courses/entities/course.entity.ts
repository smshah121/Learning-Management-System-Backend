import { Announcement } from "src/announcement/entities/announcement.entity";
import { Enrollment } from "src/enrollments/entities/enrollment.entity";
import { Lecture } from "src/lectures/entities/lecture.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.courses)
  instructor: User;

  @OneToMany(() => Lecture, (lecture) => lecture.course)
  lectures: Lecture[];

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(()=> Announcement, (announcement)=> announcement.course,{
    cascade: true
  })
  announcement: Announcement[]
}
