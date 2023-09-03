import { Module } from '@nestjs/common';
import { CohortEmployeeService } from './cohort-employee.service';
import { CohortEmployeeController } from './cohort-employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CohortEmployeeEntity } from './entities/cohort-employee.entity';
import { CohortModule } from 'src/cohort/cohort.module';
import { UserModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([CohortEmployeeEntity]),
    CohortModule,
    forwardRef(() => UserModule),
  ],
  controllers: [CohortEmployeeController],
  providers: [CohortEmployeeService],
  exports: [CohortEmployeeService],
})
export class CohortEmployeeModule {}
