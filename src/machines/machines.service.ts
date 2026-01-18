import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachinesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMachineDto) {
  try {
    return await this.prisma.machine.create({
      data: {
        name: dto.name,
        model: dto.model ?? null, // L'operatore ?? è più sicuro di ||
        location: dto.location ?? null,
      },
    });
  } catch (error: any) {
    // P2002 è il codice di errore Prisma per il vincolo di unicità fallito
    if (error.code === 'P2002') {
      throw new ConflictException(`La macchina con nome "${dto.name}" esiste già.`);
  }
    throw error;
    }
  }

  findAll() {
    return this.prisma.machine.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.machine.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateMachineDto) {
    return this.prisma.machine.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.machine.delete({
      where: { id },
    });
  }
}