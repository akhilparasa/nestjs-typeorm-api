import { IsArray } from "class-validator";
import {PageMetaDataDto} from "./PageMetaDataDto";


export class PaginatedResponseDto<T> {
    @IsArray()
    readonly data: T[];
    readonly meta: PageMetaDataDto;

    constructor(data: T[], meta: PageMetaDataDto) {
        this.data = data;
        this.meta = meta;
    }
}