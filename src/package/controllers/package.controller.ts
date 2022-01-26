import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {PackageService} from "../services/package.service";
import {CreatePackageDto} from "../dto/CreatePackageDto";
import {Observable} from "rxjs";
import {PackageEntity} from "../package.entity";
import {PageOptionsDto} from "../../common/dto/PageOptionsDto";
import {PaginatedResponseDto} from "../../common/dto/PaginatedResponseDto";
import {PackageListResponseDto} from "../dto/PackageListResponseDto";
import {PackageVersionsListResponseDto} from "../dto/PackageVersionsListResponseDto";

@Controller('packages')
export class PackageController {
    constructor(private packageService: PackageService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() packageToCreate: CreatePackageDto): Promise<CreatePackageDto> {
        if (await this.packageService.getByName(CreatePackageDto.name) != null) {
            throw new HttpException(`Package with name '${packageToCreate.name}' already exists.`, HttpStatus.BAD_REQUEST);
        }
        return this.packageService.create(packageToCreate);
    }

    @Get()
    get(@Query() pageOptionsDto: PageOptionsDto): Promise<PaginatedResponseDto<PackageListResponseDto>> {
        return this.packageService.get(pageOptionsDto);
    }

    @Get(':id/versions')
    async getVersions(@Query() pageOptionsDto: PageOptionsDto, @Param('id') id: string): Promise<PaginatedResponseDto<PackageVersionsListResponseDto>> {
        if (await this.packageService.getById(id) == null) {
            throw new HttpException('Invalid Package Id.', HttpStatus.NOT_FOUND);
        }
        return this.packageService.getVersions(id, pageOptionsDto);
    }
}
