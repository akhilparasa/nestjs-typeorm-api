import { Module } from '@nestjs/common';
import { PackageService } from './services/package.service';
import { PackageController } from './controllers/package.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PackageEntity} from "./package.entity";
import {PackageVersionEntity} from "./package_version.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity, PackageVersionEntity])],
  providers: [PackageService],
  controllers: [PackageController]
})
export class PackageModule {}
