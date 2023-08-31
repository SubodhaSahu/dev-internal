import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CohortEntity } from 'src/cohort/entities/cohort.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Index('Cohort_FK', ['cohortFk'], {})
@Index('Employee_FK', ['employeeFk'], {})
@Entity('STG_Cohort_Emp')
export class CohortEmployeeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Cohort_Emp_PK' })
  cohortEmpPk: number;

  @Column('int', { name: 'Cohort_FK', nullable: true })
  cohortFk: number | null;

  @Column('varchar', { name: 'Cohort_ID', nullable: true, length: 255 })
  cohortId: string | null;

  @Column('varchar', { name: 'Cohort_Name', nullable: true, length: 255 })
  cohortName: string | null;

  @Column('int', { name: 'Employee_FK', nullable: true })
  employeeFk: number | null;

  @Column('varchar', { name: 'Employee_ID', nullable: true, length: 255 })
  employeeId: string | null;

  @Column('varchar', { name: 'Employee_Name', nullable: true, length: 255 })
  employeeName: string | null;

  @Column('varchar', {
    name: 'Employee_Department',
    nullable: true,
    length: 255,
  })
  employeeDepartment: string | null;

  @Column('varchar', { name: 'Employee_Role', nullable: true, length: 255 })
  employeeRole: string | null;

  @Column('date', { name: 'Valid_from', nullable: true })
  validFrom: string | null;

  @Column('date', { name: 'Valid_to', nullable: true })
  validTo: string | null;

  @Column('tinyint', {
    name: 'Latest_Flag',
    nullable: true,
    default: () => "'1'",
  })
  latestFlag: number | null;

  @Column('tinyint', {
    name: 'Active_Flag',
    nullable: true,
    default: () => "'1'",
  })
  activeFlag: number | null;

  @Column('datetime', { name: 'Record_Date_Time', nullable: true })
  recordDateTime: Date | null;

  @Column('varchar', { name: 'Company_Tenant_ID', nullable: true, length: 255 })
  companyTenantId: string | null;

  @ManyToOne(() => CohortEntity, (stgCohort) => stgCohort.cohortEmps, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'Cohort_FK', referencedColumnName: 'cohortPk' }])
  cohortFk2: CohortEntity;

  @ManyToOne(() => UserEntity, (stgEmployee) => stgEmployee.cohortEmps, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'Employee_FK', referencedColumnName: 'employeePk' }])
  employeeFk2: UserEntity;
}
