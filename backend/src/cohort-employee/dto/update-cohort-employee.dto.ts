import { PartialType } from '@nestjs/mapped-types';
import { CreateCohortEmployeeDto } from './create-cohort-employee.dto';

export class UpdateCohortEmployeeDto extends PartialType(CreateCohortEmployeeDto) {}
