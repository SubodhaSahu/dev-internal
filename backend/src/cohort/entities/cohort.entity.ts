import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('STG_COHORT')
export class CohortEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Cohort_PK' })
  cohortPk: number;

  @Column('varchar', { name: 'Cohort_ID', nullable: true, length: 255 })
  Cohort_ID: string | null;

  @Column('varchar', { name: 'Cohort_Group', nullable: true, length: 255 })
  Cohort_Group: string | null;

  @Column('varchar', { name: 'Cohort_Name', nullable: true, length: 255 })
  Cohort_Name: string | null;

  @Column('datetime', { name: 'Valid_From', nullable: true })
  Valid_From: Date | null;

  @Column('datetime', { name: 'Valid_To', nullable: true })
  Valid_To: Date | null;

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

  // @Column('datetime', { name: 'Record_Date_Time', nullable: true })
  // recordDateTime: Date | null;

  // @Column('varchar', { name: 'Company_Tenant_ID', nullable: true, length: 255 })
  // companyTenantID: string | null;
}
