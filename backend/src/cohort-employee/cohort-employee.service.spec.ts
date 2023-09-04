import { Test, TestingModule } from '@nestjs/testing';
import { CohortEmployeeService } from './cohort-employee.service';
import { CohortEmployeeEntity } from './entities/cohort-employee.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

describe('CohortEmployeeService', () => {
  let service: CohortEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CohortEmployeeService,
        {
          provide: getRepositoryToken(CohortEmployeeEntity),
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
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

    service = module.get<CohortEmployeeService>(CohortEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
