import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private regionRepository: Repository<RegionEntity>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const cohortRegionEntity = this.regionRepository.create(createRegionDto);
    return await this.regionRepository.save(cohortRegionEntity);
  }

  async findAll() {
    const regionResult: RegionEntity[] = await this.regionRepository.find({
      select: ['cohortGroupPk', 'cohortGroup'],
      relations: ['cohorts', 'cohorts.cohortEmps'],
    });
    return this.mapRegionResult(regionResult);
  }

  async findOne(id: number) {
    const regionResult: RegionEntity[] = await this.regionRepository.find({
      select: ['cohortGroupPk', 'cohortGroup'],
      relations: ['cohorts', 'cohorts.cohortEmps'],
      where: { cohortGroupPk: id },
    });
    return this.mapRegionResult(regionResult)[0];
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    console.log(updateRegionDto);
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
  mapRegionResult(regionResult: RegionEntity[]) {
    return regionResult.map((region) => ({
      cohortGroupPk: region.cohortGroupPk,
      cohertGroupId: region.cohortGroupPk,
      cohertGroupName: region.cohortGroup,
      cohertList: region.cohorts.map((cohort) => ({
        cohortPk: cohort.cohortPk,
        cohortId: cohort.cohortPk,
        cohortName: cohort.cohortName,
        memberCount: cohort.cohortEmps.length,
        employees: cohort.cohortEmps.map((employee) => ({
          employeePk: employee.employeeFk,
          employeeName: employee.employeeName,
          employeeId: employee.employeeId,
          employeeRole: employee.employeeRole,
          employeeDepartment: employee.employeeDepartment,
        })),
      })),
    }));
  }
}
