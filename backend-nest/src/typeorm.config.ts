import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const SqliteTypeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite', // - DB 종류
  database: 'happbeeDB.db', // - DB 파일 이름
  autoLoadEntities: true, // - 구동시 entity파일 자동 로드
  synchronize: true, // - 서비스 구동시 entity와 디비의 테이블 싱크 개발만 할것
  // logging: true, // - orm 사용시 로그 남기기
  dropSchema: true, // - 구동시 해당 테이블 삭제 synchronize와 동시 사용
};

export const PostgresTypeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: 5432,
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: true,
    /*
    synchronize: 서버 실행때 엔티티 변경시 테이블 새로 만듦
    테이블 drop후 다시 생성이므로 데이터 모두 삭제됨.
    */
    logging: true, //ORM 작동마다 rawQuery 콘솔에 보여줌
  }),
  inject: [ConfigService],
};
