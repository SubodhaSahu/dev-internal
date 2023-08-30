import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common/utils';
import { CohortEmployeeModule } from 'src/cohort-employee/cohort-employee.module';
import { CohortModule } from 'src/cohort/cohort.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => CohortEmployeeModule),
    CohortModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
