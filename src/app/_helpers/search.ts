import { AfterContentInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Datos de la petición de una página.
 */
export class PageRequest {
  /**
   * Número de página.
   */
  page!: number;
  /**
   * Tamaño de página.
   */
  size!: number;
  /**
   * Dirección de ordenación.
   */
  direction!: Direction;
  /**
   * Propiedades por las que se realiza la ordenación.
   */
  property!: string;
}

/**
 * Petición de búsqueda. Incluye los datos de filtro y la página a consultar.
 */
export class FindRequest {
  /**
   * Datos de filtro.
   */
  filter: any;
  /**
   * Datos de la página consultar.
   */
  pageRequest: PageRequest;

  /**
   * @param searchObject (Opcional) Objeto de búsqueda,
   * en caso de estar establecdido se establecen los datos de la página a buscar.
   */
  constructor(searchObject?: FindRequest) {
    if (searchObject == null) {
      this.pageRequest = new PageRequest();
      this.pageRequest.page = 0;
      this.pageRequest.size = 10;
      this.filter = {};
    } else {
      this.filter = searchObject.filter;
      this.pageRequest = searchObject.pageRequest;
    }
  }

  /**
   * Establece el orden de la búsqueda.
   * @param direction Dirección de ordenación.
   * @param property Propiedad a ordenar.
   */
  setOrder(direction: Direction, property: string) {
    this.pageRequest.direction = direction;
    this.pageRequest.property = property;
  }

  /**
   * Establece el número de página a mostrar.
   * @param pageNumber Número de página a mostrar.
   */
  setPage(pageNumber: number) {
    this.pageRequest.page = pageNumber - 1;
  }

  /**
   * Establece el tamaño de la página.
   * @param size Tamaño de la página.
   */
  setSize(size: number) {
    this.pageRequest.size = size;
  }

  /**
   * Establece los datos de filtrado.
   * @param filter Datos de filtrado.
   */
  setFilter(filter: any) {
    this.filter = filter;
  }
}

/**
 * Datos de una página.
 */
export class Page<T> {
  /**
   * Lista de datos.
   */
  /**
   * Lista de datos.
   */
  content!: T[];
  /**
   * Indica si es la primer página.
   */
  /**
   * Indica si es la primer página.
   */
  first!: boolean;
  /**
   * Indica si es la última página.
   */
  /**
   * Indica si es la última página.
   */
  last!: boolean;
  /**
   * Número de página.
   */
  /**
   * Número de página.
   */
  number!: number;
  /**
   * Núemro de elementos
   */
  /**
   * Núemro de elementos
   */
  numberOfElements!: number;
  /**
   * Tamaño total de elementos.
   */
  /**
   * Tamaño total de elementos.
   */
  size!: number;
  /**
   * Ordenación.
   */
  /**
   * Ordenación.
   */
  sort!: string;
  /**
   * Número total de elementos.
   */
  /**
   * Número total de elementos.
   */
  totalElements!: number;
  /**
   * Número total de páginas.
   */
  /**
   * Número total de páginas.
   */
  totalPages!: number;
  /**
   * Página para el paginador de bootstrap.
   */
  /**
   * Página para el paginador de bootstrap.
   */
  uibPage!: number;
}

/**
 * Sort direction.
 */
export enum Direction {
  /**
   * Ascending sort.
   */
  ASC = 'ASC',
  /**
   * Descending sort.
   */
  DESC = 'DESC'
}

/**
 * Define una ordenación.
 */
export class Order {

  /**
   * Propiedades por las que ordena.
   */
  /**
   * Propiedades por las que ordena.
   */
  property!: string;
  /**
   * Dirección por la que ordena. ASC para ordenación ascendente, DES para ordenación descendente.
   */
  /**
   * Dirección por la que ordena. ASC para ordenación ascendente, DES para ordenación descendente.
   */
  direction!: Direction;
}

/**
 * Clase abstracta para la implementación de componentes que realicen búsquedas.
 * Contiene todas las utilidades necesarias para la realización de búsquedas
 * tipo, incluyendo filtrado, ordenación, paginación, etc.
 *
 * Se trata de una clase abstracta y genérica, con lo cual, cada Clase
 * que intente heredarla tiene que definir el tipo correspondiente.
 */
@Component({ template: '' })
export abstract class PaginatedSearchComponent<T> implements AfterContentInit {
  /**
   * Petición de búsqueda.
   */
  findRequest = new FindRequest();
  
  /**
   * Datos de la búsqueda.
   */
  searchResult!: any[];

  /**
   * Datos de la última página procesada.
   */
  resultObject!: Page<T>;

  constructor(private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService) { }

  ngAfterContentInit(): void {

    const searchFormJson = localStorage.getItem('searchform-' + this.router.url);
    const lastSearch: FindRequest = searchFormJson === null ? new FindRequest() : JSON.parse(searchFormJson);

    if (lastSearch) {
      this.findRequest = new FindRequest(lastSearch);
      this.find();
    } else {
      this.findRequest = new FindRequest();
      this.findRequest.filter = {};
      this.resultObject = new Page<T>();
    }

    if (!this.findRequest.pageRequest.property || this.findRequest.pageRequest.property.length === 0) {
      const order: Order = this.getDefaultOrder();
      this.findRequest.setOrder(order.direction, order.property);  // se debe fijar un orden por defecto
    }
  }

  /**
   * Realiza la búsqueda en función de los datos existentes en findRequest.
   * Delega la llamada al servicio a la clase que la herede.
   */
  find() {
    localStorage.setItem('searchform-' + this.router.url, JSON.stringify(this.findRequest));
    this.findInternal(this.findRequest).subscribe(
      ((page: Page<T>) => {
        this.searchResult = page.content;
        page.uibPage = page.number + 1;
        this.resultObject = page;
      })
    );
  }

  /**
   * Realiza la ordenación por una propiedad.
   * En primer lugar realiza la ordenación de modo descendente y
   * si se vuelve a llamar va invirtiendo la ordenación.
   * @param property Propiedad por la que se pretende ordenar.
   */
  sort(property: string) {
    if (this.findRequest.pageRequest.property === property) {
      if (this.findRequest.pageRequest.direction === Direction.DESC) {
        this.findRequest.pageRequest.direction = Direction.ASC;
      } else {
        
        this.findRequest.pageRequest.direction = Direction.DESC;
      }
    } else {
      this.findRequest.pageRequest.property = property;
      this.findRequest.pageRequest.direction = Direction.ASC;
    }

    this.find();
  }

  /**
   * Obtiene el icono de ordenación de una columna.
   * @param property Propiedad de la que se pretende obtener el icono de ordenación.
   * @returns Clase bootstrap con el icono a mostrar.
   */
  getSortIcon(property: string): string {
    let result: string = 'oi oi-chevron-top';

    if (this.findRequest.pageRequest.property === property) {
      if (this.findRequest.pageRequest.direction === Direction.DESC) {
        result = 'oi oi-chevron-bottom';
      }
    }

    return result;
  }

  /**
   * Realiza el borrado de una entidad de la tabla.
   * @param entity Entidad para la que se pretende realizar el borrado.
   */
  remove(entity: T) {
    console.log('borrando elemento ...', entity);
    this.removeInternal(entity).subscribe({
      next: (response: Response | {}) => {
        console.log(response);
        this.find();
      },
      error: (error: Response) => {
        console.error(error);
        if (error.status === 403) {
          this.toastr.error(this.translate.instant('toast.error403-body'), this.translate.instant('toast.error403'));
        }
      }
    });
  }

  /**
   * Cambia la página que se está mostrando desde el paginador.
   * @param uibPage Página a mostrar
   */
  showPage(uibPage: number) {
    this.findRequest.pageRequest.page = uibPage - 1;
    this.find();
  }

  /**
   * Cambia el tamaño de la página del paginador.
   * @param size Nuevo tamaño de página.
   */
  changeSize(size: number) {
    this.findRequest.pageRequest.page = 0;
    this.findRequest.pageRequest.size = size;
    this.find();
  }

  /**
   * Realiza la llamada al servicio para obtener los resultados.
   * Este metodo será definido por la clase final.
   * @param findRequest Datos de búsqueda.
   * @returns Observable con el resultado de la obtención de los datos.
   */
  protected abstract findInternal(findRequest: FindRequest): Observable<Page<T>>;

  /**
   * Realiza la llamada al servicio para realizar el borrado de una entidad.
   * Este metodo será definido por la clase final.
   * @param entity Entidad a eliminar.
   * @returns Observable con el resultado de la eliminación.
   */
  protected abstract removeInternal(entity: T): Observable<Response | {}>;

  /**
   * Obtiene el orden por defecto a aplicar en caso que no se defina ninguno.
   * @returns Orden por defecto a aplicar.
   */
  protected abstract getDefaultOrder(): Order;
}
