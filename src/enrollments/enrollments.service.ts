import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment) private enrollRepository: Repository<Enrollment>,
    @InjectRepository(Course) private courseRepository: Repository<Course>
  ){}

  async enroll(courseId: number, user: any) {
  const course = await this.courseRepository.findOne({ where: { id: courseId } });
  if (!course) throw new NotFoundException('Course not found');

  const existing = await this.enrollRepository.findOne({
    where: { course: { id: courseId }, student: { id: user.id } }
  });
  if (existing) throw new BadRequestException('Already enrolled');

  const enrollment = this.enrollRepository.create({
    course,
    student: user,
  });

  return this.enrollRepository.save(enrollment);
}
  findCourseByStudent(userId: number){
    return this.enrollRepository.find({
      where: {student: {id: userId}},
      relations: ["course","course.instructor"]
    })
  }

  findStudentByCourse(courseId: number){
    return this.enrollRepository.find({
      where: {course: {id: courseId}},
      relations: ["student"]
    })
  }

  async removeEnrollment(enrollmentId: number, id: number){
    const enrollment = await this.enrollRepository.findOne({
      where: {id: enrollmentId},
      relations: ["course", "student"]
    })
    if(!enrollment) throw new NotFoundException("enrollment not found")
    if(enrollment.student.id !== id) throw new NotFoundException("you are not allowed to remove this course")
    return this.enrollRepository.remove(enrollment)
  }
}
