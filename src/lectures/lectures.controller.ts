import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  @Post()
  @UseInterceptors(FileFieldsInterceptor(
    [{ name: 'docs', maxCount: 5 }],
    {
      storage: diskStorage({
        destination: './uploads/docs',
        filename: (req, file, cb) => {
          const unique = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, unique);
        },
      }),
    }
  ))
  create(@Body() createLectureDto: CreateLectureDto,
  @UploadedFiles() files: { docs?: Express.Multer.File[] },
){
    const docPaths = files?.docs?.map(file => `/uploads/docs/${file.filename}`) || [];
  return this.lecturesService.create({
    ...createLectureDto,
    docs: docPaths,
  });
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("/course/:id")
  findByCourse(@Param("id")id: string){
    return this.lecturesService.findByCourse(+id)
  }

  @UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string) {
  return this.lecturesService.findOne(+id);
}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLectureDto: UpdateLectureDto){
    return this.lecturesService.update(+id,updateLectureDto)
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  remove(@Param("id") id:string){
    return this.lecturesService.removeLecture(+id)
    
  }

  
}






