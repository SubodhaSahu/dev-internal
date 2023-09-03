import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateCohortEmployeeDto {
  @IsNotEmpty()
  @Expose({ name: 'cohortPk' })
  cohortFk: number;
  cohortId: string;
  cohortName: string;

  @IsNotEmpty()
  @Expose({ name: 'employeePk' })
  employeeFk: number;
  employeeId: string;

  @IsNotEmpty()
  employeeName: string;

  @IsNotEmpty()
  employeeDepartment: string;

  @IsNotEmpty()
  employeeRole: string;

  validFrom: Date;
  validTo: Date;
  latestFlag: number;
  activeFlag: number;
  recordDateTime: Date;
  companyTenantId: string;
}
