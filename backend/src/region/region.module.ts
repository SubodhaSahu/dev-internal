import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { CohortModule } from 'src/cohort/cohort.module';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from './entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity]), CohortModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
