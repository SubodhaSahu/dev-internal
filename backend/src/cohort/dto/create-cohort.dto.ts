import { IsNotEmpty } from 'class-validator';

export class CreateCohortDto {
  cohortPk: number;

  @IsNotEmpty()
  cohortId: string;

  @IsNotEmpty()
  cohortName: string;

  @IsNotEmpty()
  cohortGroupId: number;
  validFrom: Date;
  validTo: Date;
  latestFlag: number;
  activeFlag: number;
  recordDateTime: Date;
  companyTenantId: string;
}
