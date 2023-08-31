import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CohortService } from '../cohort.service';
// import { CreateCohortGroupDto } from '../dto/create-cohort-group.dto';
// import { UpdateCohortDto } from '../dto/update-cohort.dto';

@Controller('cohort-group')
export class CohortGroupController {
  constructor(private readonly cohortService: CohortService) {}

  @Post()
  // create(@Body() createCohortDto: CreateCohortGroupDto) {
  //   return this.cohortService.createCohortGroup(createCohortDto);
  // }
  @Get()
  findAll() {
    //return 'All Cohort Groups along with cohort and each cohort employee count';
    return this.cohortService.findCohortGroup();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cohortService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCohortDto: UpdateCohortDto) {
  //   return this.cohortService.update(+id, updateCohortDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cohortService.remove(+id);
  }
}
