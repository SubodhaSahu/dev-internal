import { Controller, Post, Body } from '@nestjs/common';
import { CohortEmployeeService } from './cohort-employee.service';
import { CreateCohortEmployeeDto } from './dto/create-cohort-employee.dto';
//import { UpdateCohortEmployeeDto } from './dto/update-cohort-employee.dto';

@Controller('cohort-employee')
export class CohortEmployeeController {
  constructor(private readonly cohortEmployeeService: CohortEmployeeService) {}

  @Post()
  create(@Body() createCohortEmployeeDto: CreateCohortEmployeeDto) {
    return this.cohortEmployeeService.create(createCohortEmployeeDto);
  }

  // @Get()
  // findAll() {
  //   return this.cohortEmployeeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cohortEmployeeService.findOne(+id);
  // }

  // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateCohortEmployeeDto: UpdateCohortEmployeeDto) {
  // //   return this.cohortEmployeeService.update(+id, updateCohortEmployeeDto);
  // // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cohortEmployeeService.remove(+id);
  // }
}
