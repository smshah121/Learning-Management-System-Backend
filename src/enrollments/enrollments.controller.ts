import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}
  @UseGuards(JwtAuthGuard)  
  @Post()
  enroll(@Body() createEnrollmentDto: CreateEnrollmentDto, @Req() req){
    return this.enrollmentsService.enroll(createEnrollmentDto.courseId, req.user)
  }
  @UseGuards(JwtAuthGuard)
  @Get("/me")
  getMyEnrollments(@Req() req) {
    return this.enrollmentsService.findCourseByStudent(req.user.id);
  }

  @Get("/student/:id")
  getStudentCourse(@Param("id") id: string) {
    return this.enrollmentsService.findStudentByCourse(+id);
  }
  
  @Get("/course/:id")
  getCourseStudent(@Param("id") id: string){
    return this.enrollmentsService.findStudentByCourse(+id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  removeEnrollment(@Param("id") id: string, @Req() req){
    return this.enrollmentsService.removeEnrollment(+id, req.user.id)

  }
  
}
