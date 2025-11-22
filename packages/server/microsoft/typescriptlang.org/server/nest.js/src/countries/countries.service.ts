import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Country } from './countries.dto';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getCountries(): Promise<Country[]> {
    const url: string = 'https://restcountries.com/v3.1/all';
    const { data: countries } =
      await this.httpService.axiosRef.get<Country[]>(url);
    return countries;
  }
}
