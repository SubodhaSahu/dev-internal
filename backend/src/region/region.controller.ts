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
import { CohortService } from '../cohort/cohort.service';
import { CreateRegionDto } from './dto/create-region.dto';
import addCommonDbFields from '../../utility/commonField';
import { CreateCohortDto } from '../cohort/dto/create-cohort.dto';
//import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('region')
export class RegionController {
  constructor(
    private readonly regionService: RegionService,
    private cohortService: CohortService,
  ) {}

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Post('/cohort')
  async regionWithCohort(
    @Body() body: { cohortGroup: string; cohortName: string; cohortId: string },
  ) {
    try {
      /**
       * Cohort_Group table insert/Update
       */
      const createRegionDto: any = {};
      createRegionDto.cohortGroup = body.cohortGroup;
      const checkRegionExist = await this.regionService.findByGroupName(
        body.cohortGroup,
      );
      let cohortGroupId: number = 0;

      if (checkRegionExist) {
        cohortGroupId = checkRegionExist.cohortGroupPk;
      } else {
        const region = await this.regionService.create(createRegionDto);
        cohortGroupId = +region.cohortGroupPk;
      }

      /**
       * Cohort table insert/Update
       */
      // Create entity for the Cohort table
      let createCohortDto: CreateCohortDto = {
        cohortPk: 0,
        cohortId: body.cohortId,
        cohortName: body.cohortName,
        cohortGroupId: cohortGroupId,
        validFrom: undefined,
        validTo: undefined,
        latestFlag: 0,
        activeFlag: 0,
        recordDateTime: undefined,
        companyTenantId: '',
      };

      //Get Cohort by COhort ID
      const cohortCheck = await this.cohortService.findByCohortId(
        createCohortDto.cohortId,
      );

      //If Cohort Present then update else insert
      if (cohortCheck) {
        return this.cohortService.update(
          +cohortCheck.cohortPk,
          createCohortDto,
        );
      } else {
        createCohortDto = addCommonDbFields(createCohortDto);
        return this.cohortService.create(createCohortDto);
      }
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
