import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LecturesService {
  constructor(
    @InjectRepository(Lecture) private lectureRepository: Repository<Lecture>,
    @InjectRepository(Course) private courseRepository: Repository<Course>
  ){}
  async create(createLectureDto: CreateLectureDto) {
  const course = await this.courseRepository.findOne({
    where: { id: createLectureDto.courseId },
  });

  if (!course) throw new NotFoundException('Course not found');

  const lecture = this.lectureRepository.create({
    title: createLectureDto.title,
    docs: createLectureDto.docs || [],
    course,
  });

  return this.lectureRepository.save(lecture);
}

  async findByCourse(courseId: number) {
  console.log("🔍 Fetching lectures for course ID:", courseId);

  return this.lectureRepository.find({
  where: { course: { id: courseId } },
  relations: ['course'],
});

}


  async update(id:number, updateLectureDto: UpdateLectureDto){
    const lecture = await this.lectureRepository.findOne({where: {id}, relations: ["course"]})
    if(!lecture) throw new NotFoundException("lecture not found")
    Object.assign(lecture,updateLectureDto)
    return this.lectureRepository.save(lecture)
  } 

  async findOne(id: number){
    const lecture = await this.lectureRepository.findOne({where: {id}})
    if(!lecture) throw new NotFoundException("lecture not found")
    return lecture

  }

  async removeLecture(id: number){
    const lecture = await this.lectureRepository.find({where: {id}})
    if (!lecture) throw new NotFoundException("lecture not found")
    return this.lectureRepository.remove(lecture)

  }

  
}
