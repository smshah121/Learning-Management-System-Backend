import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course)private courseRepository: Repository<Course>,
  private userService: UserService
){}
  async create(createCourseDto: CreateCourseDto, instructorPayload: any) {
    const instructor = await this.userService.findById(instructorPayload.id)
    const course = this.courseRepository.create({
      ...createCourseDto, instructor
    })
    return this.courseRepository.save(course)
  }
  async findByInstructor(id: number) {
  return this.courseRepository.find({
    where: { instructor: { id} },
    relations: ['instructor', 'lectures', 'enrollments'],
  });
}

  findAll() {
    return this.courseRepository.find({ relations : ["instructor"]})
  }

  findOne(id: number) {
    return this.courseRepository.findOne({where: {id}, relations: ["instructor", "lectures"]})
  }

  async update(id: number, updateCourseDto: UpdateCourseDto){
    const course = await this.courseRepository.findOne({where: {id}, relations: ["instructor"]})
    if (!course) throw new NotFoundException("course not found")
    Object.assign(course,updateCourseDto)
    return this.courseRepository.save(course)
  }

  async remove(id: number) {
    const course = await this.courseRepository.find({where: {id}})
    if(!course) throw new NotFoundException("course not found")
    return this.courseRepository.remove(course)
  }

  async findallwithinstructor(){
    return await this.courseRepository.find({
      relations: ["instructor"],
      select:{
        id: true,
        title: true,
        description: true,
        instructor: {
          name: true
        }
      }
    })
  }
}
