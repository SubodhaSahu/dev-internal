import { Module } from '@nestjs/common';
import { CohortEmployeeService } from './cohort-employee.service';
import { CohortEmployeeController } from './cohort-employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CohortEmployeeEntity } from './entities/cohort-employee.entity';
import { CohortModule } from 'src/cohort/cohort.module';

@Module({
  imports: [TypeOrmModule.forFeature([CohortEmployeeEntity]), CohortModule],
  controllers: [CohortEmployeeController],
  providers: [CohortEmployeeService],
  exports: [CohortEmployeeService],
})
export class CohortEmployeeModule {}
