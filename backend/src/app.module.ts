import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CohortModule } from './cohort/cohort.module';
import { UserModule } from './user/user.module';
import { CohortEmployeeModule } from './cohort-employee/cohort-employee.module';
import dbConfiguration from 'config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    CohortModule,
    UserModule,
    CohortEmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
