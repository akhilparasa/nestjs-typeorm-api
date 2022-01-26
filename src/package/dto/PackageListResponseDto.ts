import {PackageEntity} from "../package.entity";

export class PackageListResponseDto {
    public name: string;

    public description: string;

    public version_count: number;

    constructor(entity: PackageEntity) {
        this.name = entity.name;
        this.description = entity.description;
        this.version_count = entity.version_count;
    }
}