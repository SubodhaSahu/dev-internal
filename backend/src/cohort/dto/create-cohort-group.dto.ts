import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateCohortGroupDto {
  cohortPK: number;
  cohortID: string;

  @IsNotEmpty()
  cohortGroup: string;

  @IsEmpty()
  cohortName: string;
  validFrom: Date;
  validTo: Date;
  latestFlag: 1;
  activeFlag: 1;
  recordDateTime: Date;
  companyTenantID: string;
}
