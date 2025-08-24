import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../service/country.service';
import { NotFoundComponent } from "../../../shared/component/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-by-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    },
  })

}
