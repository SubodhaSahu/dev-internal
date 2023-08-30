import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  employeeId: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  managerId: string;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  cohortId: string;

  validFrom: Date;
  validTo: Date;
  latestFlag: 1;
  activeFlag: 1;
  recordDateTime: Date;
  companyTenantID: string;
}
