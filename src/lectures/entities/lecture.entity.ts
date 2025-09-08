import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text", { array: true, nullable: true })
  docs: string[];


  @ManyToOne(() => Course, (course) => course.lectures,
  { eager: false,
    onDelete: "CASCADE"
   })
  course: Course;
}
