import { Test, TestingModule } from '@nestjs/testing';
import { CohortEmployeeService } from './cohort-employee.service';

describe('CohortEmployeeService', () => {
  let service: CohortEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CohortEmployeeService],
    }).compile();

    service = module.get<CohortEmployeeService>(CohortEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
