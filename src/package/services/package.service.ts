import { Injectable } from '@nestjs/common';
import {PackageEntity} from "../package.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreatePackageDto} from "../dto/CreatePackageDto";
import {PageOptionsDto} from "../../common/dto/PageOptionsDto";
import {PaginatedResponseDto} from "../../common/dto/PaginatedResponseDto";
import {PackageListResponseDto} from "../dto/PackageListResponseDto";
import {PageMetaDataDto} from "../../common/dto/PageMetaDataDto";
import {PackageVersionsListResponseDto} from "../dto/PackageVersionsListResponseDto";
import {PackageVersionEntity} from "../package_version.entity";

@Injectable()
export class PackageService {
    constructor(
        @InjectRepository(PackageEntity)
        private readonly packageRepository: Repository<PackageEntity>,
        @InjectRepository(PackageVersionEntity)
        private readonly packageVersionRepository: Repository<PackageVersionEntity>
    ) {}

    async create(createPackageDto: CreatePackageDto): Promise<CreatePackageDto> {
        return await this.packageRepository.save(createPackageDto);
    }

    async getByName(packageName: string): Promise<PackageEntity> {
        return await this.packageRepository.findOne({name: packageName});
    }

    async getById(id: string): Promise<PackageEntity> {
        return await this.packageRepository.findOne({id: id});
    }

    async get(pageOptionsDto: PageOptionsDto):  Promise<PaginatedResponseDto<PackageListResponseDto>> {
        const queryBuilder = this.packageRepository.createQueryBuilder("package");

        queryBuilder
            .loadRelationCountAndMap('package.version_count', 'package.versions')
            .orderBy('name', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        if (pageOptionsDto.search_text !== ''){
            queryBuilder.where(`package.name ILIKE '%${pageOptionsDto.search_text}%'`)
                .orWhere(`package.description ILIKE '%${pageOptionsDto.search_text}%'`);
        }

        const itemCount = await queryBuilder.getCount();
        const pageMetaDto = new PageMetaDataDto({ itemCount, pageOptionsDto });

        const { entities } = await queryBuilder.getRawAndEntities();
        const data: PackageListResponseDto[] = entities.map((entity) => new PackageListResponseDto(entity));

        return new PaginatedResponseDto<PackageListResponseDto>(data, pageMetaDto);
    }

    async getVersions(id:string, pageOptionsDto: PageOptionsDto):  Promise<PaginatedResponseDto<PackageVersionsListResponseDto>> {
        const queryBuilder = this.packageVersionRepository.createQueryBuilder("package_version");

        queryBuilder
            .innerJoinAndSelect('package_version.package', 'package')
            .where('package.id =:id', {id: id})
            .orderBy('package_version.version', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const pageMetaDto = new PageMetaDataDto({ itemCount, pageOptionsDto });

        const { entities } = await queryBuilder.getRawAndEntities();
        const data: PackageVersionsListResponseDto[] = entities.map((entity) => new PackageVersionsListResponseDto(entity));

        return new PaginatedResponseDto<PackageVersionsListResponseDto>(data, pageMetaDto);
    }
}
