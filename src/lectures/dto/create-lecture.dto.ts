import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateLectureDto {

    @IsString()
    @MinLength(6)
    title: string;
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    courseId: number;

    @IsOptional()
    docs?: string[]
}
