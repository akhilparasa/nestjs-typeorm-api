import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {PackageEntity} from "./package.entity";

@Entity('package_version')
export class PackageVersionEntity {
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

    @Column({
        length: 50,
        unique: true
    })
    version: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => PackageEntity, pkg => pkg.versions)
    package: PackageEntity;
}