import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface HttpOptions {
  headers: HttpHeaders;
  params: HttpParams;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, params?: HttpParams, sessionRequired?: boolean): Observable<any> {
    return this.http.get(url, this.getHttpOptions(params, null, null, sessionRequired))
      .pipe(
        map((r: Response) => this.handleSuccess(r)),
        catchError((e: any) => this.catchError(e))
      );
  }

  public post(url: string, body: any, params?: HttpParams): Observable<any> {
    // body = this.buildRequest(body);

    return this.http.post(url, body, this.getHttpOptions(params, body, url))
      .pipe(
        map((r: Response) => this.handleSuccess(r)),
        catchError((e: any) => this.catchError(e))
      );
  }

  public put(url: string, body: any, params?: HttpParams): Observable<any> {
    // body = this.buildRequest(body);

    return this.http.put(url, body, this.getHttpOptions(params, body, url))
      .pipe(
        map((r: Response) => this.handleSuccess(r)),
        catchError((e: any) => this.catchError(e))
      );
  }

  public delete(url: string, params?: HttpParams): Observable<any> {
    return this.http.delete(url, this.getHttpOptions(params))
      .pipe(
        map((r: Response) => this.handleSuccess(r)),
        catchError((e: any) => this.catchError(e))
      );
  }

  public keepAliveRefreshToken({ keepAlive, refreshToken }: { keepAlive: string, refreshToken: string }): void {
    this.http.get(keepAlive, { withCredentials: true }).subscribe();
    this.http.put(refreshToken, undefined, this.getHttpOptions()).subscribe();
  }

  private buildRequest(body: any): any {
    if (body) {
      const today: Date = new Date();

      const header: any = {
        channelTime: today.toISOString()
      };

      const request: any = {
        requestHeader: header,
        requestBody: body
      };

      return request;
    }
  }

  private getHttpOptions(params?: HttpParams, body?: any, url?: string, sessionRequired?: boolean): HttpOptions {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Content-Type': 'application/json'
    });

    return { headers, params };
  }

  private handleSuccess(r: any): any {
    if (r.status && typeof r.status === 'number' && r.status !== 200) {
      this.catchError(r);
    } else {
      return r.responseBody ? r.responseBody : r;
    }
  }

  /**
   * To fix error ```You provided an invalid object where a stream was expected.
   * You can provide an Observable, Promise, Array, or Iterable.```
   */
  private catchError(e: any): any {
    this.handleError(e);
    return e;
  }

  private handleError(e: any): void {
    if (typeof e.error === 'string') {
      e.error = { ...new Error(), status: e.status, title: e.error };
    }

    throw e;
  }

}
