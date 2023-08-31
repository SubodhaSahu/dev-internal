import { Injectable } from '@nestjs/common';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

import { Not, Repository } from 'typeorm';

import { CohortEntity } from './entities/cohort.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CohortService {
  constructor(
    @InjectRepository(CohortEntity)
    private cohortRepository: Repository<CohortEntity>,
  ) {}

  async create(createCohortDto: CreateCohortDto) {
    const cohortEntity = this.cohortRepository.create(createCohortDto);
    return await this.cohortRepository.insert(cohortEntity);
  }

  async findAll() {
    return await this.cohortRepository.find({
      where: { cohortId: Not('0'), cohortName: Not('') },
    });
  }

  async findOne(id: number) {
    return await this.cohortRepository.findOne({ where: { cohortPk: id } });
  }

  async update(id: number, data: UpdateCohortDto) {
    await this.cohortRepository.update({ cohortPk: id }, data);
    return await this.cohortRepository.findOne({ where: { cohortPk: id } });
  }

  async remove(id: number) {
    await this.cohortRepository.delete({ cohortPk: id });
    return { deleted: true };
  }
}
