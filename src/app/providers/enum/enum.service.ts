import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnumInt, GetEnumsParamsInt, GetSingleEnumParamsInt } from './enum-ints';

/**
 * Service to retrieve enums
 */
@Injectable({
  providedIn: 'root'
})
export class EnumService {
  private API_URL = 'https://apitest.komercpoj.cz/enums';
  private API_VERSION = '2.0';

  constructor(private http: HttpClient) { }

  getAll(params?: GetEnumsParamsInt) {
    let httpParams = new HttpParams();
    if (params) {
      // @ts-ignore
      httpParams = httpParams.appendAll(params);
    }
    return this.http.get<EnumInt[]>(this.getUrl('enums'), { params: httpParams });
  }

  get(enumName: string, params?: GetSingleEnumParamsInt) {
    let httpParams = new HttpParams();
    if (params) {
      // @ts-ignore
      httpParams = httpParams.appendAll(params);
    }
    return this.http.get<EnumInt>(this.getUrl(`enums/${enumName}`), { params: httpParams } );
  }

  private getUrl(path: string) {
    return `${this.API_URL}/${this.API_VERSION}/${path}`;
  }
}
