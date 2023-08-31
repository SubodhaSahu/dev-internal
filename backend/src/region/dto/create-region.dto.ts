import { IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  cohortGroupPK: number;

  @IsNotEmpty()
  CohortGroup: string;
}
