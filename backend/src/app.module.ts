import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CohortModule } from './cohort/cohort.module';
import { UserModule } from './user/user.module';
import { CohortEmployeeModule } from './cohort-employee/cohort-employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'r360poc.cjye3hf53icy.us-east-1.rds.amazonaws.com',
      username: 'admin',
      password: 'graymatter',
      database: 'r360poc1',
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
      entities: [],
    }),
    CohortModule,
    UserModule,
    CohortEmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
