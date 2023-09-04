import { CohortEntity } from '../../cohort/entities/cohort.entity';
import {
  Column,
  Entity,
  // JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SCHEMAS } from '../../../config/tables';

@Entity(SCHEMAS.region)
export class RegionEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Cohort_Group_PK' })
  cohortGroupPk: number;

  @Column('varchar', { name: 'Cohort_Group', nullable: true, length: 255 })
  cohortGroup: string | null;

  @OneToMany(() => CohortEntity, (stgCohort) => stgCohort.cohortGroup)
  cohorts: CohortEntity[];
}
