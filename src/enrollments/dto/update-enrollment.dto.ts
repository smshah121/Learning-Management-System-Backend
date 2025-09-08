import { IsNumber, IsOptional } from "class-validator";

export class UpdateEnrollmentDto {
    @IsOptional()
    @IsNumber()
    courseId?: number
}