import { Injectable } from '@nestjs/common';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

import { Not, Repository } from 'typeorm';

import { CohortEntity } from './entities/cohort.entity';
import { InjectRepository } from '@nestjs/typeorm';
//import { CreateCohortGroupDto } from './dto/create-cohort-group.dto';

@Injectable()
export class CohortService {
  constructor(
    @InjectRepository(CohortEntity)
    private cohortRepository: Repository<CohortEntity>,
  ) {}

  async create(createCohortDto: CreateCohortDto) {
    return createCohortDto;
    // const cohortEntity = this.cohortRepository.create(createCohortDto);
    // return await this.cohortRepository.insert(cohortEntity);
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
    console.log(id);
    return data;
    // await this.cohortRepository.update({ cohortPk: id }, data);
    // return await this.cohortRepository.findOne({ where: { cohortPk: id } });
  }

  async remove(id: number) {
    await this.cohortRepository.delete({ cohortPk: id });
    return { deleted: true };
  }

  // async createCohortGroup(createCohortGroupDto: CreateCohortDto) {
  //   createCohortGroupDto.cohortName = '';
  //   createCohortGroupDto.cohortId = '0';
  //   createCohortGroupDto.validFrom = new Date();
  //   createCohortGroupDto.validTo = new Date();
  //   createCohortGroupDto.recordDateTime = new Date();
  //   createCohortGroupDto.latestFlag = 1;
  //   createCohortGroupDto.activeFlag = 1;
  //   createCohortGroupDto.companyTenantId = 'R360';
  //   const cohortGroupEntity =
  //     this.cohortRepository.create(createCohortGroupDto);
  //   await this.cohortRepository.save(cohortGroupEntity);
  //   return cohortGroupEntity;
  // }

  async findCohortGroup() {
    const cohortGroups: any = await this.cohortRepository
      .createQueryBuilder('STG_Cohort')
      .select('STG_Cohort.Cohort_Group', 'cohortGroupName')
      .addSelect('STG_Cohort.Cohort_PK', 'cohortGroupId')
      .where('STG_Cohort.Cohort_Name = :name', { name: '' })
      .andWhere('STG_Cohort.cohortID = :cohortId', { cohortId: '0' })
      .printSql()
      .getRawMany();

    const promises = [];
    if (cohortGroups.length > 0) {
      cohortGroups.forEach(async (group) => {
        promises.push(this.findCohortEmpByGroup(group.cohortGroupName));
      });
    }
    const cohortEmp = await Promise.all(promises);
    cohortGroups.cohertList = cohortEmp;
    return cohortEmp;
  }

  async findCohortGroupByName() {
    return await this.cohortRepository.findOne({
      where: { cohortId: '0', cohortName: '' },
    });
  }

  async findCohortEmpByGroup(cohortGroupName: string) {
    const cohortEmp = await this.cohortRepository
      .createQueryBuilder('STG_Cohort')
      .select('STG_Cohort.Cohort_PK', 'cohortPK')
      .addSelect('STG_Cohort.Cohort_Group', 'groupName')
      .addSelect('STG_Cohort.Cohort_ID', 'cohortID')
      .addSelect('STG_Cohort.Cohort_Name', 'cohortName')
      .addSelect('count(cohortEmp.Employee_FK)', 'employeeCount')
      .where('STG_Cohort.Cohort_Group = :groupName', {
        groupName: cohortGroupName,
      })
      .andWhere('cohortEmp.Employee_FK IS NOT NULL')
      .innerJoin(
        'STG_Cohort_Emp',
        'cohortEmp',
        'cohortEmp.Cohort_FK=STG_Cohort.Cohort_PK',
      )
      .groupBy('STG_Cohort.Cohort_Group')
      .printSql()
      .getRawMany();
    return cohortEmp;
  }
  async findEmployeeCohort(id: number){
    return  await this.cohortRepository.find({
      relations: ['cohortEmps'],
      where: {
        cohortPk: id,
    }
    });
   
  }
}
