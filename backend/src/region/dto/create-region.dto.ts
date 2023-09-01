import { IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  cohortGroupPk: number;

  @IsNotEmpty()
  CohortGroup: string;
}
