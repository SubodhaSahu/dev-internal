import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.validFrom = new Date();
      createUserDto.validTo = new Date();
      createUserDto.recordDateTime = new Date();
      createUserDto.latestFlag = 1;
      createUserDto.activeFlag = 1;
      createUserDto.companyTenantID = 'R360';
      const userEntity = this.userRepository.create(createUserDto);
      const employeeDetails = await this.userRepository.insert(userEntity);
      const employeePk = employeeDetails.identifiers[0].employeePk;

      return await this.userRepository.findOne({
        where: { employeePk: employeePk },
      });
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { employeePk: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update({ employeePk: id }, updateUserDto);
      return await this.userRepository.findOne({ where: { employeePk: id } });
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    return await this.userRepository.delete({ employeePk: id });
  }

  //get distince Role
  async userRoles() {
    const roles = await this.userRepository
      .createQueryBuilder()
      .select('Role', 'role')
      .distinct(true)
      .getRawMany();
    const returnRes = [];
    roles.map((role) => {
      returnRes.push(role.role);
    });

    return returnRes;
  }

  //get distince Department
  async userDepartments() {
    const departments = await this.userRepository
      .createQueryBuilder()
      .select('Department', 'department')
      .distinct(true)
      .getRawMany();
    const returnRes = [];
    departments.map((department) => {
      returnRes.push(department.department);
    });

    return returnRes;
  }

  async searchByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async searchByResearcherId(searchByResearcherId: string) {
    return await this.userRepository.findOne({
      where: { employeeId: searchByResearcherId },
    });
  }
}
