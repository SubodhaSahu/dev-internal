export class CreateCohortDto {
  Cohort_PK: number;
  Cohort_ID: string;
  Cohort_Group: string;
  Cohort_Name: string;
  Valid_From: Date;
  Valid_To: Date;
  Latest_Flag: 1;
  Active_Flag: 1;
  //recordDateTime: Date;
  // companyTenantID: string;
}
