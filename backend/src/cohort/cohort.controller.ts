import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

@Controller('cohort')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}

  @Post()
  async create(@Body() createCohortDto: CreateCohortDto) {
    //Check if Cohort Group Exists. If exists then insert only the
    //cohord infor else insert cohord group first then insert the cohord
    const createCohortGroupDTO = JSON.parse(JSON.stringify(createCohortDto));
    const cohortGroupExist = await this.cohortService.findCohortGroupByName(
      createCohortGroupDTO.cohortGroup,
    );
    console.log(cohortGroupExist);
    if (!cohortGroupExist) {
      const newGroup =
        await this.cohortService.createCohortGroup(createCohortGroupDTO);
      console.log(newGroup);
    }

    const cohortNames = createCohortDto.cohortName;
    const cohordEntities: any = [];

    for (let i = 0; i < cohortNames.length; i++) {
      const tempEntity: any = {};
      tempEntity.cohortName = cohortNames[i];
      tempEntity.cohortGroup = createCohortDto.cohortGroup;
      tempEntity.cohortID = createCohortDto.cohortID;
      tempEntity.validFrom = new Date();
      tempEntity.validTo = new Date();
      tempEntity.recordDateTime = new Date();
      tempEntity.latestFlag = 1;
      tempEntity.activeFlag = 1;
      tempEntity.companyTenantID = 'R360';
      cohordEntities.push(tempEntity);
    }

    return this.cohortService.create(cohordEntities);
    return cohordEntities;
  }

  @Get()
  findAll() {
    return this.cohortService.findAll();
    //return `This action returns all cats`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cohortService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCohortDto: UpdateCohortDto) {
    return this.cohortService.update(+id, updateCohortDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cohortService.remove(+id);
  }
}
