import { Test, TestingModule } from '@nestjs/testing';
import { RegionService } from './region.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegionEntity } from './entities/region.entity';

describe('RegionService', () => {
  let service: RegionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<RegionService>(RegionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
