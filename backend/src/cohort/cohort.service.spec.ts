import { Test, TestingModule } from '@nestjs/testing';
import { CohortService } from './cohort.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CohortEntity } from './entities/cohort.entity';

describe('CohortService', () => {
  let service: CohortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CohortService>(CohortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
