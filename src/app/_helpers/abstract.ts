import { Observable, throwError } from 'rxjs';

/**
 * Servicio abstracto con métodos para la obtención de datos
 * de la request y manejo de errores en las llamadas HTTP.
 */
export abstract class AbstractService {
    /**
     * Extrae los datos de la request.
     * @param res Response
     * @returns Datos de respuesta.
     */
    protected extractData(res: Response): any {
        let body: any;
        if (res.text() != null) {
            body = res.json();
        } else {
            body = {};
        }
        return body;
    }

    /**
     * Maneja los errores de las llamadas HTTP.
     * @param error datos del error obtenido directamente de la llamada HTTP.
     * @returns Any
     */
    protected handleError(error: Response | any): Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(() => error);
    }
}
