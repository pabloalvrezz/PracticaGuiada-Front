import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from '../_helpers/search';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

/**
 * Componente para incluir la paginación en las pantallas de búsqueda.
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {
    
  /**
   * Atributo de entrada. Datos de la página actual.
   */
  @Input() resultObject!: Page<any>;

  /**
   * Evento que se llama cuando cambie el número de página.
   */
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Evento que se llama cuando cambie el tamaño de página.
   */
  @Output() sizeChanged: EventEmitter<number> = new EventEmitter<number>();

  min = 0;
  max = 0;
  totalElements = 0;
  currentPage = 1;
  pageSize = 0;

  ngOnChanges(changes: SimpleChanges): void {
      if (this.resultObject != null) {
          this.min = this.resultObject.number * this.resultObject.size + 1;
          this.max = this.resultObject.number * this.resultObject.size + this.resultObject.numberOfElements;
          this.totalElements = this.resultObject.totalElements || 0;
          this.pageSize = this.resultObject.size;
        }
    }
  
  /**
   * Se notifica el cambio de página.
   * @param event Datos del evento.
   */
  showPage(event: PageChangedEvent ) {
    this.pageChanged.next(event.page);
  }

  /**
   * Se notifica el cambio de tamaño.
   */
  changeSize() {
    this.sizeChanged.next(this.pageSize);
  }
}
