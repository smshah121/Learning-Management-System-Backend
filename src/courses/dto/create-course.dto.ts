import { IsString, MinLength } from "class-validator";

export class CreateCourseDto {

    
    @IsString()
    @MinLength(6)
    title: string;

    @IsString()
    @MinLength(6)
    description: string;
}
