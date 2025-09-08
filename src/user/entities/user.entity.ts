import { UserRole } from "src/common/enums/user-role.enum";
import { Course } from "src/courses/entities/course.entity";
import { Enrollment } from "src/enrollments/entities/enrollment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique:true})
    email: string

    @Column()
    password: string

    @Column({type: "enum", enum: UserRole, default: UserRole.STUDENT})
    role: UserRole


    @OneToMany(() => Course, course => course.instructor)
    courses: Course[];

    @OneToMany(() => Enrollment, enrollment => enrollment.student)
    enrollments: Enrollment[];

}
