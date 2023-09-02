import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CohortEmployeeService } from 'src/cohort-employee/cohort-employee.service';
import { CohortService } from 'src/cohort/cohort.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cohortEmpService: CohortEmployeeService,
    private cohortService: CohortService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id/cohort/:cohortId')
  async deleteEmpFromCohort(
    @Param('id') id: string,
    @Param('cohortId') cohortId: string,
  ) {
    return await this.cohortEmpService.deleteEmpFromCohort(+id, +cohortId);
  }

  @Get('/config/roles')
  findRolers() {
    return this.userService.userRoles();
  }

  @Get('/config/departments')
  findDepartments() {
    return this.userService.userDepartments();
  }

  @Get('/search/email/:email')
  searchByEmail(@Param('email') email: string) {
    return this.userService.searchByEmail(email);
  }

  @Get('/search/researcher_id/:researcherId')
  searchByResearcherId(@Param('researcherId') researcherId: string) {
    return this.userService.searchByResearcherId(researcherId);
  }
}
