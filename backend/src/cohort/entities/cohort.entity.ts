import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CohortEmployeeEntity } from 'src/cohort-employee/entities/cohort-employee.entity';

@Entity('STG_Cohort')
export class CohortEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Cohort_PK' })
  cohortPK: number;

  @Column('varchar', { name: 'Cohort_ID', nullable: true, length: 255 })
  cohortID: string | null;

  @Column('varchar', { name: 'Cohort_Group', nullable: true, length: 255 })
  cohortGroup: string | null;

  @Column('varchar', { name: 'Cohort_Name', nullable: true, length: 255 })
  cohortName: string | null;

  @Column('datetime', { name: 'Valid_From', nullable: true })
  validFrom: Date | null;

  @Column('datetime', { name: 'Valid_To', nullable: true })
  validTo: Date | null;

  @Column('tinyint', {
    name: 'Latest_Flag',
    nullable: true,
    comment: '0 is false, 1 is true',
    default: () => "'1'",
  })
  latestFlag: number | null;

  @Column('tinyint', {
    name: 'Active_Flag',
    nullable: true,
    comment: '0 is false, 1 is true',
    default: () => "'0'",
  })
  activeFlag: number | null;

  @Column('datetime', { name: 'Record_Date_Time', nullable: true })
  recordDateTime: Date | null;

  @Column('varchar', { name: 'Company_Tenant_ID', nullable: true, length: 255 })
  companyTenantID: string | null;

  @OneToMany(
    () => CohortEmployeeEntity,
    (stgCohortEmp) => stgCohortEmp.cohortFk2,
  )
  CohortEmps: CohortEmployeeEntity[];
}
