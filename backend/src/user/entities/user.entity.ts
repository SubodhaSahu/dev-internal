import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  //   Index,
  //   ManyToOne,
  //   JoinColumn,
} from 'typeorm';
import { CohortEmployeeEntity } from '../../cohort-employee/entities/cohort-employee.entity';
import { SCHEMAS } from '../../../config/tables';

@Entity(SCHEMAS.user)
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Employee_PK' })
  employeePk: number;

  @Column('varchar', { name: 'Employee_ID', nullable: true, length: 255 })
  employeeId: string | null;

  @Column('varchar', { name: 'First_Name', nullable: true, length: 255 })
  firstName: string | null;

  @Column('varchar', { name: 'Last_Name', nullable: true, length: 255 })
  lastName: string | null;

  @Column('varchar', { name: 'Email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'Department', nullable: true, length: 255 })
  department: string | null;

  @Column('varchar', { name: 'Role', nullable: true, length: 255 })
  role: string | null;

  @Column('varchar', { name: 'Manager_Name', nullable: true, length: 255 })
  managerName: string | null;

  @Column('varchar', { name: 'Manager_Id', nullable: true, length: 255 })
  managerId: string | null;

  @Column('varchar', { name: 'Employee_Type', nullable: true, length: 255 })
  employeeType: string | null;

  @Column('datetime', { name: 'DOJ', nullable: true })
  doj: Date | null;

  @Column('datetime', { name: 'DOS', nullable: true })
  dos: Date | null;

  @Column('varchar', { name: 'Profile_name', nullable: true, length: 255 })
  profileName: string | null;

  @Column('varchar', { name: 'Proficiency_Level', nullable: true, length: 255 })
  proficiencyLevel: string | null;

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

  @OneToMany(() => CohortEmployeeEntity, (CohortEmp) => CohortEmp.employeeFk2)
  cohortEmps: CohortEmployeeEntity[];
}
