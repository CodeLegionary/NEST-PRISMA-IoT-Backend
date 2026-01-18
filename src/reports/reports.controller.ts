import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { GetReportsQueryDto } from './dto/get-reports.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async getReports(@Query() query: GetReportsQueryDto) {
    return this.reportsService.getReports(query);
  }

  @Post()
  async createReport(@Body() dto: CreateReportDto) {
    return this.reportsService.createReport(dto);
  }
}