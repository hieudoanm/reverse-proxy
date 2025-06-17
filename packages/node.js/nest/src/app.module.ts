import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { CountriesModule } from './countries/countries.module';
import { HealthModule } from './health/health.module';

const throttlerOption = {
  ttl: 60000,
  limit: 10,
};

@Module({
  imports: [
    ThrottlerModule.forRoot([throttlerOption]),
    CacheModule.register(),
    CountriesModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
