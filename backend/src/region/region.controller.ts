import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CohortService } from 'src/cohort/cohort.service';
import { CreateRegionDto } from './dto/create-region.dto';
//import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('region')
export class RegionController {
  constructor(
    private readonly regionService: RegionService,
    private cohortService: CohortService
  ) { }

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Post('/cohort')
  async regionWithCohort(@Body() body: { cohortGroup: string, cohortName: string, cohortId: string }) {
    try {
      //Create entity for the Cohort_Group table.
      const createRegionDto: any = {};
      createRegionDto.cohortGroup = body.cohortGroup;
      const region = await this.regionService.create(createRegionDto);

      // Create entity for the Cohort table
      const createCohortDto: any = {};
      createCohortDto.cohortGroupId = region.cohortGroupPk;
      createCohortDto.cohortName = body.cohortName;
      createCohortDto.cohortId = body.cohortId;
      return this.cohortService.create(createCohortDto);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
  //   return this.regionService.update(+id, updateRegionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
