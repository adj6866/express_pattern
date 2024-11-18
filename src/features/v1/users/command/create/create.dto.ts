import {
  IsString,
  IsEmail,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsEmailUnique } from '@/shared/decorators/is-email-unique.decorator';

class RoleDto {
  @IsNotEmpty()
  id: number | string;

  @IsArray()
  @IsString({ each: true })
  branches: string[];
}

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: RoleDto[];
}
