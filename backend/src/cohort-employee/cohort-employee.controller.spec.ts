import { Test, TestingModule } from '@nestjs/testing';
import { CohortEmployeeController } from './cohort-employee.controller';
import { CohortEmployeeService } from './cohort-employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CohortEmployeeEntity } from './entities/cohort-employee.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { CohortService } from '../cohort/cohort.service';
import { CohortEntity } from '../cohort/entities/cohort.entity';

describe('CohortEmployeeController', () => {
  let controller: CohortEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohortEmployeeController],
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

    controller = module.get<CohortEmployeeController>(CohortEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
