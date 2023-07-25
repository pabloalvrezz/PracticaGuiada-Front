import {BASE_URL} from '../configuration';
import { HttpParams } from '@angular/common/http';
import { PageRequest } from './search';

/**
 * Clase de ayuda para la realización de llamadas HTTP.
 */
export class Helper {
    /**
     * Completa la URL a llamar con la URL base.
     * @param fragment Fragmento de URL.
     */
    static getUrl(fragment: string) {
        return BASE_URL + fragment;
    }

    /**
     * Add a parameter to request parameter list.
     * @param params  request parameter list.
     * @param name parameter name.
     * @param value parameter value.
     * @returns new request params.
     */
    static addParam(params: HttpParams, name: string, value: string | number): HttpParams {
        if (value) {
            const strValue = String(value);

            if (strValue !== '') {
                params = params.append(name, strValue);
            }
        }

        return params;
    }

    /**
     * Add pagination parameters to request parameter list.
     * @param params request parameter list.
     * @param pageRequest page request.
     * @returns new request params
     */
    static addPaginationParams(params: HttpParams, pageRequest: PageRequest): HttpParams {
        if (pageRequest.size) {
            params = params.set('size', String(pageRequest.size));
        }
      
        if (pageRequest.page) {
            params = params.set('page', String(pageRequest.page));
        }
    
        if (pageRequest.property) {
            let sort = pageRequest.property;
            
            if (pageRequest.direction) {
                sort += ',' + pageRequest.direction;
            }
            
            params = params.set('sort', sort);
        }

        return params;
    }
}
