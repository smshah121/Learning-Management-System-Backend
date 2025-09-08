import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Announcement {
    @PrimaryGeneratedColumn()
    id: number

    

    @Column("text")
    message:string

    @ManyToOne(()=> Course,(course)=> course.announcement, {
        onDelete: "CASCADE"
    })
    course:Course


}
