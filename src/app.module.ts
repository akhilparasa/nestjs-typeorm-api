import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { PackageModule } from './package/package.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true}),
      TypeOrmModule.forRoot({
          type: 'postgres',
          port: 5432,
          host: process.env.POSTGRES_HOST,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          autoLoadEntities: true,
          synchronize: true,
      }),
      PackageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
