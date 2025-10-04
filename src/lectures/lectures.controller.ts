import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { Express, Request } from 'express';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UserRole } from 'src/common/enums/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  // ✅ Create Lecture
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  @Post()
  create(@Body() dto: CreateLectureDto) {
    return this.lecturesService.create(dto);
  }

  // ✅ Upload Docs for a Lecture
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  @Post(':id/docs')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // keep file in memory
      limits: { fileSize: 20 * 1024 * 1024 }, // optional: max 20MB
    }),
  )
  async uploadDocs(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new NotFoundException('No file uploaded');
    return this.lecturesService.addDoc(id, file); // service will handle Cloudinary
  }

  // ✅ Get lectures by course
  @UseGuards(JwtAuthGuard)
  @Get('/course/:id')
  findByCourse(@Param('id', ParseIntPipe) id: number) {
    return this.lecturesService.findByCourse(id);
  }

  // ✅ Get single lecture
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lecturesService.findOne(id);
  }

  // ✅ Update Lecture
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLectureDto,
  ) {
    return this.lecturesService.update(id, dto);
  }

  // ✅ Delete Lecture
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lecturesService.removeLecture(id);
  }
}
