import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../service/country.service';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {

  queryParam = queryParam.toLocaleLowerCase();

  const validRegions: Record<string, Region> = {
    Africa: 'Africa',
    Americas: 'Americas',
    Asia: 'Asia',
    Europe: 'Europe',
    Oceania: 'Oceania',
    Antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region') ?? '');

  selectedRegion = linkedSignal<Region | null>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      // console.log(params);
      if (!params.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region,

        }
      })
      return this.countryService.searchByRegion(params.region);
    }
  });

}
