import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
} from '@nestjs/common';
import { CohortEmployeeService } from './cohort-employee.service';
import { CohortService } from 'src/cohort/cohort.service';
import { UserService } from 'src/user/user.service';
import { CreateCohortEmployeeDto } from './dto/create-cohort-employee.dto';
import { UpdateCohortEmployeeDto } from './dto/update-cohort-employee.dto';
import addCommonDbFields from 'utility/commonField';
import { EMPRECNOTFOUND } from 'config/message';

@Controller('cohort-employee')
export class CohortEmployeeController {
  constructor(
    private readonly cohortEmployeeService: CohortEmployeeService,
    private cohortService: CohortService,
    private userService: UserService,
  ) {}

  @Post()
  async create(@Body() createCohortEmployeeDto: CreateCohortEmployeeDto) {
    try {
      //Check if employee present in the user table or not
      const empRecord = await this.userService.findOne(
        createCohortEmployeeDto.employeeFk,
      );
      if (!empRecord) {
        throw new HttpException(EMPRECNOTFOUND, HttpStatus.BAD_REQUEST);
      }

      //Check if the cohort_employee table already have a record for the particular employee in the same cohort.
      const cohortEmpRecord =
        await this.cohortEmployeeService.findByEmpIdandCohortId(
          createCohortEmployeeDto.cohortFk,
          createCohortEmployeeDto.employeeFk,
        );

      //If record present then update
      if (cohortEmpRecord) {
        return this.cohortEmployeeService.update(
          cohortEmpRecord.cohortEmpPk,
          createCohortEmployeeDto,
        );
      } else {
        //Insert

        //Get Cohort details and add it.
        const cohortDetails = await this.cohortService.findOne(
          +createCohortEmployeeDto.cohortFk,
        );
        createCohortEmployeeDto.cohortName = cohortDetails.cohortName;
        createCohortEmployeeDto.cohortId = cohortDetails.cohortId;
        createCohortEmployeeDto.employeeId = empRecord.employeeId;

        //Add the common field such as latestFlag, activeFlag, validateForm, validateTo
        createCohortEmployeeDto = addCommonDbFields(createCohortEmployeeDto);
        createCohortEmployeeDto.validFrom = empRecord.validFrom;
        createCohortEmployeeDto.validTo = empRecord.validTo;
        return this.cohortEmployeeService.create(createCohortEmployeeDto);
      }
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.cohortEmployeeService.findAll();
  }

  //Get Cohort Employee Details by cohort Id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cohortEmployeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCohortEmployeeDto: UpdateCohortEmployeeDto,
  ) {
    return this.cohortEmployeeService.update(+id, updateCohortEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cohortEmployeeService.remove(+id);
  }
}
