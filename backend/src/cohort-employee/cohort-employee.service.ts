import { Injectable } from '@nestjs/common';
import { CreateCohortEmployeeDto } from './dto/create-cohort-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CohortEmployeeEntity } from './entities/cohort-employee.entity';
import { Repository } from 'typeorm';
import { UpdateCohortEmployeeDto } from './dto/update-cohort-employee.dto';

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

  async findAll() {
    return await this.cohortEmp.find();
  }

  async findOne(id: number) {
    return await this.cohortEmp.findOne({ where: { employeeFk: id } });
  }

  async findByEmpIdandCohortId(empPk: number, cohortPk: number) {
    return await this.cohortEmp.findOne({
      where: { employeeFk: empPk, cohortFk: cohortPk },
    });
  }

  async update(id: number, updateCohortEmployeeDto: UpdateCohortEmployeeDto) {
    try {
      await this.cohortEmp.update({ cohortEmpPk: id }, updateCohortEmployeeDto);
      return await this.cohortEmp.findOne({ where: { cohortEmpPk: id } });
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    return await this.cohortEmp.delete({ cohortEmpPk: id });
  }

  async deleteEmployee(id: number) {
    return await this.cohortEmp.delete({ employeeFk: id });
  }
  async deleteEmpFromCohort(id: number, cohortId: number) {
    return await this.cohortEmp.delete({ employeeFk: id, cohortFk: cohortId });
  }
}
