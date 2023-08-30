import { Controller, Get, Param, Delete, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto } from './dto/create-user.dto';
import { CohortEmployeeService } from 'src/cohort-employee/cohort-employee.service';
import { CohortService } from 'src/cohort/cohort.service';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cohortEmpService: CohortEmployeeService,
    private cohortService: CohortService,
  ) {}

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    const employeePk = await this.userService.create(CreateUserDto);

    //Create entity for the Cohort_Emp table.
    const cohortEmpDto: any = {};
    cohortEmpDto.cohortFk = CreateUserDto.cohortId;
    cohortEmpDto.employeeFk = employeePk;
    cohortEmpDto.employeeId = CreateUserDto.employeeId;
    cohortEmpDto.employeeName = CreateUserDto.firstName;
    cohortEmpDto.employeeDepartment = CreateUserDto.department;
    cohortEmpDto.employeeRole = CreateUserDto.role;
    cohortEmpDto.validFrom = new Date();
    cohortEmpDto.validTo = new Date();
    cohortEmpDto.recordDateTime = new Date();
    cohortEmpDto.latestFlag = 1;
    cohortEmpDto.activeFlag = 1;
    cohortEmpDto.companyTenantId = 'R360';

    const cohortdetals = await this.cohortService.findOne(
      parseInt(CreateUserDto.cohortId),
    );
    cohortEmpDto.cohortId = cohortdetals.cohortID;
    cohortEmpDto.cohortName = cohortdetals.cohortName;
    console.log(cohortEmpDto);
    console.log(employeePk);
    console.log(cohortdetals);
    return this.cohortEmpService.create(cohortEmpDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
