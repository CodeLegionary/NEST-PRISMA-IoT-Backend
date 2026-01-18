import { IsISO8601, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  machineId!: string;

  @IsISO8601()
  reportDate!: string;

  @IsString()
  type!: string; // PERFORMANCE | ERROR | USER_FEEDBACK

  @IsString()
  status!: string; // OPEN | CLOSED | IN_PROGRESS

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsObject()
  payload?: Record<string, any>;
}