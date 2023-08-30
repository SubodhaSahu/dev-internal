import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CohortService } from './cohort.service';
import { CohortController } from './cohort.controller';
import { CohortGroupController } from './cohort-group.controller';
import { CohortEntity } from './entities/cohort.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CohortEntity])],
  controllers: [CohortController, CohortGroupController],
  providers: [CohortService],
  exports: [CohortService],
})
export class CohortModule {}
