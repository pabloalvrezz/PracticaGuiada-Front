import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Price } from '../_models/price';
import { FindRequest, Order, Page, PaginatedSearchComponent } from '../_helpers/search';
import { Observable } from 'rxjs';
import { PricesService } from '../_services/prices.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styles: [
  ]
})
export class PricesComponent extends PaginatedSearchComponent<Price> {

  constructor(router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private pricesService: PricesService) {
    super(router, translate, toastr);
  }

  protected override findInternal(findRequest: FindRequest): Observable<Page<Price>> {
    return this.pricesService.searchPrices(findRequest)
  }
  protected override removeInternal(entity: Price): Observable<{} | Response> {
    throw new Error('Method not implemented.');
  }
  protected override getDefaultOrder(): Order {
    throw new Error('Method not implemented.');
  }

}
