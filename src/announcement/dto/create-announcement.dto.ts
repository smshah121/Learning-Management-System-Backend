import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateAnnouncementDto {
    
    @IsString()
    @IsOptional()
    message?:string

    @IsNumber()
    @IsOptional()
    courseId?: number
}
