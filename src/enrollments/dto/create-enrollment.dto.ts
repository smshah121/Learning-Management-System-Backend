import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateEnrollmentDto {
    @Type(() => Number)
    @IsNumber()
    courseId: number;
}
