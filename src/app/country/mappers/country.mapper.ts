import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { Languages, Eur, Translation } from '../interfaces/rest-countries.interfaces';


export class CountryMapper {
  // static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      // name: restCountry.name.common,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      population: restCountry.population
    };
  }


  // static RESTCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(
    restCountries: RESTCountry[]): Country[] {

    return restCountries.map(this.mapRestCountryToCountry);

  }

}
