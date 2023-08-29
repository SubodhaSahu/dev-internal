import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CohortService } from './cohort.service';
import { CohortController } from './cohort.controller';
import { CohortEntity } from './entities/cohort.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CohortEntity])],
  controllers: [CohortController],
  providers: [CohortService],
})
export class CohortModule {}
