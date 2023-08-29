import { Injectable } from '@nestjs/common';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

import { Not, Repository } from 'typeorm';

import { CohortEntity } from './entities/cohort.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCohortGroupDto } from './dto/create-cohort-group.dto';

@Injectable()
export class CohortService {
  constructor(
    @InjectRepository(CohortEntity)
    private cohortRepository: Repository<CohortEntity>,
  ) {}

  async create(createCohortDto: CreateCohortDto) {
    const cohortEntity = this.cohortRepository.create(createCohortDto);
    await this.cohortRepository.insert(cohortEntity);

    //Check if Cohort Group Exists. If exists then insert only the
    //cohord infor else insert cohord group first then insert the cohord
    const createCohortGroupDTO = JSON.parse(JSON.stringify(createCohortDto));
    const cohortGroupExist = await this.findCohortGroupByName(
      createCohortGroupDTO.cohortGroup,
    );
    console.log(cohortGroupExist);
    if (!cohortGroupExist) {
      console.log('Here......');
      const newGroup = await this.createCohortGroup(createCohortGroupDTO);
      console.log(newGroup);
    }
    return cohortEntity;
  }

  async findAll() {
    return await this.cohortRepository.find({
      where: { cohortID: Not('0'), cohortName: Not('') },
    });
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

  async createCohortGroup(createCohortGroupDto: CreateCohortGroupDto) {
    createCohortGroupDto.cohortName = '';
    createCohortGroupDto.cohortID = '0';
    createCohortGroupDto.validFrom = new Date();
    createCohortGroupDto.validTo = new Date();
    createCohortGroupDto.recordDateTime = new Date();
    createCohortGroupDto.latestFlag = 1;
    createCohortGroupDto.activeFlag = 1;
    createCohortGroupDto.companyTenantID = 'R360';
    const cohortGroupEntity =
      this.cohortRepository.create(createCohortGroupDto);
    await this.cohortRepository.save(cohortGroupEntity);
    return cohortGroupEntity;
  }

  async findCohortGroup() {
    return await this.cohortRepository.find({
      where: { cohortID: '0', cohortName: '' },
    });
  }

  async findCohortGroupByName(cohortGroup: string) {
    return await this.cohortRepository.findOne({
      where: { cohortID: '0', cohortName: '', cohortGroup: cohortGroup },
    });
  }
}
