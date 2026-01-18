import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { GetReportsQueryDto } from './dto/get-reports.dto';

@Injectable()
export class ReportsService {
  private readonly DEFAULT_PAGE_SIZE = 50;
  private readonly MAX_PAGE_SIZE = 200;

  constructor(private readonly prisma: PrismaService) {}

async createReport(dto: CreateReportDto) {
  try {
    return await this.prisma.report.create({
      data: {
        reportDate: new Date(dto.reportDate),
        type: dto.type,
        status: dto.status,
        userId: dto.userId ?? null,
        payload: dto.payload ?? {},
        machine: {
          connect: { id: dto.machineId }
        },
      },
      include: {
        machine: true,
      },
    });
  } catch (error: any) {
    // P2025 è il codice Prisma per "Record to connect not found"
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Impossibile creare il report: la macchina con ID "${dto.machineId}" non esiste.`);
      }
    }
    throw error;
  }
}


  async getReports(query: GetReportsQueryDto) {
    const pageSize = Math.min(query.pageSize || this.DEFAULT_PAGE_SIZE, this.MAX_PAGE_SIZE);

    const now = new Date();
    const from = query.from ? new Date(query.from) : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const to = query.to ? new Date(query.to) : now;

    const where: any = {
      reportDate: {
        gte: from,
        lte: to,
      },
    };

    if (query.machineId) {
      where.machineId = query.machineId;
    }
    if (query.type) {
      where.type = query.type;
    }
    if (query.status) {
      where.status = query.status;
    }

    const reports = await this.prisma.report.findMany({
      where,
      take: pageSize + 1,
      ...(query.cursor
        ? {
            skip: 1,
            cursor: { id: query.cursor },
          }
        : {}),
      orderBy: {
        reportDate: 'desc',
      },
      include: {
        machine: true,
      },
    });

    const hasMore = reports.length > pageSize;
    const data = hasMore ? reports.slice(0, pageSize) : reports;
    const nextCursor = hasMore ? data[data.length - 1].id : null;

    return {
      data,
      meta: {
        pageSize: data.length,
        nextCursor,
        hasMore,
        filters: {
          from: from.toISOString(),
          to: to.toISOString(),
          machineId: query.machineId || null,
          type: query.type || null,
          status: query.status || null,
        },
      },
    };
  }
}
