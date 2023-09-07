import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../_models/product';

@Component({
    selector: 'selector-name',
    templateUrl: 'searcher-details.component.html'
})

export class SearcherDetailsComponent implements OnInit {
    product: Product = new Product();

    constructor(private router: Router,
        private translate: TranslateService,
        private toastr: ToastrService,
        private route: ActivatedRoute
      ) {
      }
    

    ngOnInit() { 
        console.log(this.product.description)
    }
}