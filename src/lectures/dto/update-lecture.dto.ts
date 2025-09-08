import { IsOptional, IsString } from "class-validator";

export class UpdateLectureDto {
    @IsOptional()
    @IsString()
    title: string;
    @IsOptional()
    docs?: string[]
}