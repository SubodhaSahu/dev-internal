import { Injectable } from '@nestjs/common';
import { CreateCohortEmployeeDto } from './dto/create-cohort-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CohortEmployeeEntity } from './entities/cohort-employee.entity';
import { Repository } from 'typeorm';
//import { UpdateCohortEmployeeDto } from './dto/update-cohort-employee.dto';

import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class CohortEmployeeService {
  constructor(
    @InjectRepository(CohortEmployeeEntity)
    private cohortEmp: Repository<CohortEmployeeEntity>,
  ) {}

  async create(createCohortEmployeeDto: CreateCohortEmployeeDto) {
    try {
      const cohortEmpEntity = this.cohortEmp.create(createCohortEmployeeDto);
      return await this.cohortEmp.save(cohortEmpEntity, { reload: false });
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  // findAll() {
  //   return `This action returns all cohortEmployee`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} cohortEmployee`;
  // }

  // update(id: number, updateCohortEmployeeDto: UpdateCohortEmployeeDto) {
  //   return `This action updates a #${id} cohortEmployee`;
  // }

  async remove(id: number) {
    return await this.cohortEmp.delete({ employeeFk: id });
  }

  async deleteEmployee(id: number) {
    return await this.cohortEmp.delete({ employeeFk: id });
  }
}
