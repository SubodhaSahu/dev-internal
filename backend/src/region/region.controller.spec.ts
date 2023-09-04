import { Test, TestingModule } from '@nestjs/testing';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegionEntity } from './entities/region.entity';
import { CohortService } from '../cohort/cohort.service';
import { CohortEntity } from '../cohort/entities/cohort.entity';

describe('RegionController', () => {
  let controller: RegionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionController],
      providers: [
        RegionService,
        {
          provide: getRepositoryToken(RegionEntity),
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
        CohortService,
        {
          provide: getRepositoryToken(CohortEntity),
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RegionController>(RegionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
