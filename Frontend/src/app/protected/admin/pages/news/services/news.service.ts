import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { NewsResponse, News } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _baseUrl: string = environment.baseUrl;
  private new!: News;
  private token: string = localStorage.getItem('token')!==null? localStorage.getItem('token')! : '';
  private headers = { headers: new HttpHeaders().set('token', this.token ) };

  constructor( private http: HttpClient  ) { }

  public newNew( title: string, description: string, newsUuid: number): Observable<NewsResponse> {

    const url = this._baseUrl + '/news/';
    const body = { title, description, newsUuid };

    return this.http.post<NewsResponse>(url, body, this.headers)
    .pipe(
      tap( resp => {
        if ( resp.ok ) {
          this.new = {
            title,
            description,
            newsUuid
          }
        }
      }),
      map( resp => resp ),
      catchError( err => of(err.error) )
    );
  }


  public updateNew(title: string, description: string, newsUuid: number): Observable<NewsResponse> {

    const url = this._baseUrl + '/news/' + newsUuid;
    const body = { title, description };

    return this.http.put<NewsResponse>(url, body, this.headers)
    .pipe(
      tap( resp => {
        if ( resp.ok ) {
          this.new = {
            title,
            description,
            newsUuid
          }
        }
      }),
      map( resp => resp ),
      catchError( err => of(err.error) )
    );
  }

  public getNews(page: number = 1,limit: number = 0): Observable<NewsResponse> {
    const url = this._baseUrl + '/news';
    const options = { params: new HttpParams().set('page', page).set('limit', limit) };

    return this.http.get<NewsResponse>(url,options)
    .pipe(
      map( resp => resp ),
      catchError( err => of(err.error) )
    );
  }

  public getNewById( id: string ): Observable<NewsResponse> {

    const url = this._baseUrl + '/news/' + id;

    return this.http.get<NewsResponse>(url, this.headers)
    .pipe(
      tap( resp => {
        if ( resp.ok ) {
          this.new = resp.new!
        }
      }),
      map( resp => resp ),
      catchError( err => of(err.error) )
    );
  }

  public deleteNew( id: string ): Observable<NewsResponse> {

    const url = this._baseUrl + '/news/' + id;

    return this.http.delete<NewsResponse>(url,this.headers)
    .pipe(
      tap( resp => {
        if ( resp.ok ) {
          this.new = resp.new!
        }
      }),
      map( resp => resp ),
      catchError( err => of(err.error) )
    );
  }

}
