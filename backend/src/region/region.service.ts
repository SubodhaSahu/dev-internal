import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
//import { UpdateRegionDto } from './dto/update-region.dto';
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
    console.log(createRegionDto);
    // const cohortRegionEntity = this.regionRepository.create(createRegionDto);
    // return await this.regionRepository.save(cohortRegionEntity);
  }

  async findAll() {
    // return await this.regionRepository
    //   .createQueryBuilder('group')
    //   .select('group.cohortGroupPk', 'cohortGroupPk')
    //   //.addSelect('cohorts.cohortName', 'cohortPk')
    //   .leftJoin('group.cohorts', 'cohorts')
    //   //.where("user.name = :name", { name: "Timber" })
    //   .getOne();
    //return user;
    // return await this.regionRepository
    //   .createQueryBuilder('group')
    //   .select('group.cohortGroupPk', 'cohortGroupPk')
    //   .addSelect('group.cohortGroup', 'cohortGroup')
    //   .addSelect('cohorts.cohortPk', 'cohortPk')
    //   .leftJoin('group.cohorts', 'cohorts')
    //   .addSelect(['cohorts.cohortName'])
    //   .getMany();
    // const trees = await this.regionRepository
    //   .getTreeRepository(Category)
    //   .findTrees();
    //return result;
    //console.log(result);
    //.leftJoinAndSelect('user.linkedCow', 'linkedCow')
    // const res = await this.regionRepository.find({
    //   relations: {
    //     cohorts: {
    //       cohortEmps: true,
    //     },
    //   },
    // });

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
        })),
      })),
    }));
    return returnRes;
  }

  async findOne(id: number) {
    console.log(id);
    // return await this.regionRepository.findOne({
    //   where: { cohortGroupPK: id },
    // });
  }

  // update(id: number, updateRegionDto: UpdateRegionDto) {
  //   return `This action updates a #${id} region`;
  // }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
