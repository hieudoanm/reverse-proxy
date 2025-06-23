import { ApiProperty } from '@nestjs/swagger';

export class CoatOfArms {
  @ApiProperty({ name: 'png' })
  public png: string;

  @ApiProperty({ name: 'svg' })
  public svg: string;
}

export class Flags {
  @ApiProperty({ name: 'alt' })
  public alt: string;

  @ApiProperty({ name: 'png' })
  public png: string;

  @ApiProperty({ name: 'svg' })
  public svg: string;
}

export class Currency {
  @ApiProperty({ name: 'name' })
  public name: string;

  @ApiProperty({ name: 'symbol' })
  public symbol: string;
}

export class Country {
  @ApiProperty({ name: 'coatOfArms', type: CoatOfArms })
  public coatOfArms: CoatOfArms;

  @ApiProperty({ name: 'flags', type: Flags })
  public flags: Flags;

  @ApiProperty({ name: 'currencies', type: Map<string, Currency> })
  public currencies: Map<string, Currency>;

  @ApiProperty({ name: 'altSpellings' })
  public altSpellings: string[];

  @ApiProperty({ name: 'capital' })
  public capital: string[];

  @ApiProperty({ name: 'timezones' })
  public timezones: string[];

  @ApiProperty({ name: 'tld' })
  public tld: string[];

  @ApiProperty({ name: 'continents' })
  public continents: string[];

  @ApiProperty({ name: 'latlng' })
  public latlng: number[];

  @ApiProperty({ name: 'cca2' })
  public cca2: string;

  @ApiProperty({ name: 'cca3' })
  public cca3: string;

  @ApiProperty({ name: 'ccn3' })
  public ccn3: string;

  @ApiProperty({ name: 'cioc' })
  public cioc: string;

  @ApiProperty({ name: 'independent' })
  public independent: boolean;

  @ApiProperty({ name: 'status' })
  public status: string;

  @ApiProperty({ name: 'unMember' })
  public unMember: boolean;

  @ApiProperty({ name: 'region' })
  public region: string;

  @ApiProperty({ name: 'subregion' })
  public subregion: string;

  @ApiProperty({ name: 'landlocked' })
  public landlocked: boolean;

  @ApiProperty({ name: 'area' })
  public area: number;

  @ApiProperty({ name: 'flag' })
  public flag: string;

  @ApiProperty({ name: 'population' })
  public population: number;

  @ApiProperty({ name: 'fifa' })
  public fifa: string;

  @ApiProperty({ name: 'startOfWeek' })
  public startOfWeek: string;
}
