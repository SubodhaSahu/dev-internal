import { Injectable } from '@nestjs/common';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

import { Repository } from 'typeorm';

import { CohortEntity } from './entities/cohort.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CohortService {
  constructor(
    @InjectRepository(CohortEntity)
    private cohortRepository: Repository<CohortEntity>,
  ) {}

  async create(createCohortDto: CreateCohortDto) {
    createCohortDto.validFrom = new Date();
    createCohortDto.validTo = new Date();
    createCohortDto.recordDateTime = new Date();
    createCohortDto.latestFlag = 1;
    createCohortDto.activeFlag = 1;
    createCohortDto.companyTenantID = 'R360';
    const cohort = this.cohortRepository.create(createCohortDto);
    await this.cohortRepository.save(createCohortDto);
    return cohort;
  }

  async findAll() {
    return await this.cohortRepository.find();
  }

  async findOne(id: number) {
    return await this.cohortRepository.findOne({ where: { cohortPK: id } });
  }

  async update(id: number, data: UpdateCohortDto) {
    await this.cohortRepository.update({ cohortPK: id }, data);
    return await this.cohortRepository.findOne({ where: { cohortPK: id } });
  }

  async remove(id: number) {
    await this.cohortRepository.delete({ cohortPK: id });
    return { deleted: true };
  }
}
