import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegionEntity } from 'src/region/entities/region.entity';
import { CohortEmployeeEntity } from 'src/cohort-employee/entities/cohort-employee.entity';

@Index('fk_cohort_grp', ['cohortGroupId'], {})
@Entity('STG_Cohort')
export class CohortEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Cohort_PK' })
  cohortPk: number;

  @Column('varchar', { name: 'Cohort_ID', nullable: true, length: 255 })
  cohortId: string | null;

  @Column('varchar', { name: 'Cohort_Name', nullable: true, length: 255 })
  cohortName: string | null;

  @Column('int', { name: 'Cohort_Group_ID' })
  cohortGroupId: number;

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

  @ManyToOne(() => RegionEntity, (stgCohortGrp) => stgCohortGrp.cohorts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'Cohort_Group_ID', referencedColumnName: 'cohortGroupPk' },
  ])
  cohortGroup: RegionEntity;

  @OneToMany(
    () => CohortEmployeeEntity,
    (stgCohortEmp) => stgCohortEmp.cohortFk2,
  )
  cohortEmps: CohortEmployeeEntity[];
}
