import { Test, TestingModule } from '@nestjs/testing';
import { CohortEmployeeController } from './cohort-employee.controller';
import { CohortEmployeeService } from './cohort-employee.service';

describe('CohortEmployeeController', () => {
  let controller: CohortEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CohortEmployeeController],
      providers: [CohortEmployeeService],
    }).compile();

    controller = module.get<CohortEmployeeController>(CohortEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
