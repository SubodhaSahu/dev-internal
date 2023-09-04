import { Test, TestingModule } from '@nestjs/testing';
import { CohortController } from './cohort.controller';
import { CohortService } from './cohort.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CohortEntity } from './entities/cohort.entity';

describe('CohortController', () => {
  let controller: CohortController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohortController],
      providers: [
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

    controller = module.get<CohortController>(CohortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
