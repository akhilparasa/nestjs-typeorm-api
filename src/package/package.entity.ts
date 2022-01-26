import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PackageVersionEntity} from "./package_version.entity";
import {ignoreElements} from "rxjs";
import {Exclude} from "class-transformer";

@Entity('package')
export class PackageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
        unique: true
    })
    name: string;

    @Column({
        length: 500,
        unique: true
    })
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(type => PackageVersionEntity, package_version => package_version.package)
    versions: PackageVersionEntity[];

    @Exclude()
    version_count: number;
}