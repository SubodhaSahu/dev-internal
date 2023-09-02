import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserDepartment } from 'config/userDepartments';
import { UserRole } from 'config/userRole';

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
  @IsEnum(UserDepartment)
  department: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
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
