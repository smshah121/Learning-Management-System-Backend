import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import cloudinary from 'src/common/cloudinary/cloudinary.config';
import * as streamifier from 'streamifier';

@Injectable()
export class LecturesService {
  constructor(
    @InjectRepository(Lecture) private lectureRepo: Repository<Lecture>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  async create(dto: CreateLectureDto) {
    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const lecture = this.lectureRepo.create({
      title: dto.title,
      docs: [], // start empty
      course,
    });

    return this.lectureRepo.save(lecture);
  }

  async addDoc(lectureId: number, file: Express.Multer.File) {
    const lecture = await this.lectureRepo.findOne({ where: { id: lectureId } });
    if (!lecture) throw new NotFoundException('Lecture not found');

    return new Promise(async (resolve, reject) => {
      try {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'lectures' },
          async (error, result) => {
            if (error) return reject(error);
            if (!result?.secure_url) return reject(new Error('Cloudinary upload failed'));

            // push new doc URL into lecture.docs
            lecture.docs = [...(lecture.docs || []), result.secure_url];
            const updatedLecture = await this.lectureRepo.save(lecture);

            resolve(updatedLecture);
          },
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      } catch (err) {
        reject(err);
      }
    });
  }

  async update(id: number, dto: UpdateLectureDto) {
    const lecture = await this.lectureRepo.findOne({ where: { id } });
    if (!lecture) throw new NotFoundException('Lecture not found');

    Object.assign(lecture, dto);
    return this.lectureRepo.save(lecture);
  }

  async findByCourse(courseId: number) {
    return this.lectureRepo.find({
      where: { course: { id: courseId } },
      relations: ['course'],
    });
  }

  async findOne(id: number) {
    return this.lectureRepo.findOne({ where: { id }, relations: ['course'] });
  }

  async removeLecture(id: number) {
    const lecture = await this.lectureRepo.findOne({ where: { id } });
    if (!lecture) throw new NotFoundException('Lecture not found');
    return this.lectureRepo.remove(lecture);
  }

  async removeDoc(lectureId: number, docUrl: string) {
    const lecture = await this.lectureRepo.findOne({ where: { id: lectureId } });
    if (!lecture) throw new NotFoundException('Lecture not found');

    lecture.docs = lecture.docs.filter((url) => url !== docUrl);
    return this.lectureRepo.save(lecture);
  }
}
