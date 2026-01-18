import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMachineDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
