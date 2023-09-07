import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'selector-name',
    templateUrl: 'searcher-details.component.html'
})

export class SearcherDetailsComponent implements OnInit {
    constructor(private router: Router,
        private translate: TranslateService,
        private toastr: ToastrService,
        private route: ActivatedRoute
      ) {
      }
    

    ngOnInit() { }
}