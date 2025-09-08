import { IsEnum, IsString } from "class-validator"
import { UserRole } from "src/common/enums/user-role.enum"

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsEnum(UserRole)
    role: UserRole
}
