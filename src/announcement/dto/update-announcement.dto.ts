import { IsNumber, IsString } from "class-validator";

export class UpdateAnnouncementDto {
    

    @IsString()
    message:string

    @IsNumber()
    courseId: number
}