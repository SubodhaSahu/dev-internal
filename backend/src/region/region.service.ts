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
    const regionResult = await this.regionRepository.find({
      select: ['cohortGroupPk', 'cohortGroup'],
      relations: ['cohorts', 'cohorts.cohortEmps'],
    });
    const returnRes = regionResult.map((region) => ({
      cohertGroupId: region.cohortGroupPk,
      cohertGroupName: region.cohortGroup,
      cohertList: region.cohorts.map((cohort) => ({
        cohortId: cohort.cohortPk,
        cohortName: cohort.cohortName,
        memberCount: cohort.cohortEmps.length,
        employees: cohort.cohortEmps.map((employee) => ({
          employeeName: employee.employeeName,
          employeeId: employee.employeeId,
          employeeRole: employee.employeeRole,
        })),
      })),
    }));
    return returnRes;
  }

  async findOne(id: number) {
    return await this.regionRepository.findOne({
      where: { cohortGroupPk: id },
    });
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    console.log(updateRegionDto);
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
