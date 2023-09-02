import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CohortEmployeeService } from 'src/cohort-employee/cohort-employee.service';
import { CohortService } from 'src/cohort/cohort.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'config/userRole';
import { UserDepartment } from 'config/userDepartments';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cohortEmpService: CohortEmployeeService,
    private cohortService: CohortService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const employeePk = await this.userService.create(createUserDto);

      //Create entity for the Cohort_Emp table.
      const cohortEmpDto: any = {};
      cohortEmpDto.cohortFk = createUserDto.cohortId;
      cohortEmpDto.employeeFk = employeePk;
      cohortEmpDto.employeeId = createUserDto.employeeId;
      cohortEmpDto.employeeName = createUserDto.firstName;
      cohortEmpDto.employeeDepartment = createUserDto.department;
      cohortEmpDto.employeeRole = createUserDto.role;
      cohortEmpDto.validFrom = new Date();
      cohortEmpDto.validTo = new Date();
      cohortEmpDto.recordDateTime = new Date();
      cohortEmpDto.latestFlag = 1;
      cohortEmpDto.activeFlag = 1;
      cohortEmpDto.companyTenantId = 'R360';

      const cohortdetals = await this.cohortService.findOne(
        parseInt(createUserDto.cohortId),
      );
      cohortEmpDto.cohortId = cohortdetals.cohortId;
      cohortEmpDto.cohortName = cohortdetals.cohortName;
      console.log(cohortEmpDto);
      console.log(employeePk);
      console.log(cohortdetals);
      return this.cohortEmpService.create(cohortEmpDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('/config/roles')
  findRolers() {
    return UserRole;
  }

  @Get('/config/departments')
  findDepartments() {
    return UserDepartment;
  }
}
