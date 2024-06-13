import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostgresTypeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(PostgresTypeOrmConfig),
    // TypeOrmModule.forRoot(SqliteTypeOrmConfig),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
