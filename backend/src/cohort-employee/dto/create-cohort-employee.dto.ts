export class CreateCohortEmployeeDto {
  cohortFk: number;
  cohortId: string;
  cohortName: string;
  employeeFk: number;
  employeeId: string;
  employeeName: string;
  employeeDepartment: string;
  employeeRole: string;
  validFrom: Date;
  validTo: Date;
  latestFlag: number;
  activeFlag: number;
  recordDateTime: Date;
  companyTenantId: string;
}
