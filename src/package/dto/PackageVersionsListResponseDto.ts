import {PackageVersionEntity} from "../package_version.entity";

export class PackageVersionsListResponseDto {
    public name: string;

    public description: string;

    public version: string;

    constructor(entity: PackageVersionEntity) {
        this.name = entity.name;
        this.description = entity.description;
        this.version = entity.version;
    }
}