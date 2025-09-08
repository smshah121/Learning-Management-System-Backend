import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ){}


  async create(createAnnouncementDto:CreateAnnouncementDto){
    const course = await this.courseRepository.findOne({where: {id: createAnnouncementDto.courseId}})
    if(!course) throw new NotFoundException("course not found")
    const announcement = this.announcementRepository.create({
    ...createAnnouncementDto,
    course
  })
  return this.announcementRepository.save(announcement)
  }

  findByCourse(courseId:number){
    return this.announcementRepository.find({where: {course: {id: courseId}},
      relations: ["course"]
    
    })

  }

  async remove(id:number){
    const announcement = await this.announcementRepository.findOne({where:{id}})
    if(!announcement) throw new NotFoundException("Announcement not found")
    return this.announcementRepository.remove(announcement)

  }
}
