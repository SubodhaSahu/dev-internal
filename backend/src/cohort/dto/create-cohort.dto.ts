import { IsNotEmpty } from 'class-validator';

export class CreateCohortDto {
  cohortPK: number;

  @IsNotEmpty()
  cohortID: string;

  @IsNotEmpty()
  cohortGroup: string;

  @IsNotEmpty()
  cohortName: string;
  validFrom: Date;
  validTo: Date;
  latestFlag: 1;
  activeFlag: 1;
  recordDateTime: Date;
  companyTenantID: string;
}
