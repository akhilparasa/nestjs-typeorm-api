import {IsEnum, IsInt, IsOptional, IsString, Max, Min} from "class-validator";
import {Order} from "../Order";
import {Type} from "class-transformer";

export class PageOptionsDto {
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly take?: number = 10;

    @IsString()
    @IsOptional()
    search_text: string;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}