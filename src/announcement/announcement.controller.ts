import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';

@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  @Roles(UserRole.INSTRUCTOR)
  create(@Body() createAnnouncementDto:CreateAnnouncementDto){
    return this.announcementService.create(createAnnouncementDto)
  }  
  @UseGuards(JwtAuthGuard,RolesGuard)
  
  @Roles(UserRole.INSTRUCTOR,UserRole.STUDENT)
  @Get("course/:id")
  findByCourse(@Param("id")id:number){
    return this.announcementService.findByCourse(id)
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  @Delete(":id")
  remove(@Param("id")id:number){
    return this.announcementService.remove(id)
  }

  

}
