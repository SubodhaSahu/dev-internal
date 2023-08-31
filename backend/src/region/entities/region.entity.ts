import { CohortEntity } from 'src/cohort/entities/cohort.entity';
import {
  Column,
  Entity,
  // JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('STG_Cohort_Group')
export class RegionEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Cohort_Group_PK' })
  cohortGroupPk: number;

  @Column('varchar', { name: 'Cohort_Group', nullable: true, length: 255 })
  cohortGroup: string | null;

  @OneToMany(() => CohortEntity, (stgCohort) => stgCohort.cohortGroup)
  cohorts: CohortEntity[];
}
