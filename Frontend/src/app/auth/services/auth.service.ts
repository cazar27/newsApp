import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { UsersResponse, AuthResponse } from 'src/app/auth/interfaces/authResponse.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getUsers(): Observable<UsersResponse> {
    const url = this._baseUrl + '/users';

    return this.http.get<UsersResponse>(url)
    .pipe(
      map( resp => resp ),
      catchError( err => of(err.error) )
    );
  }

  private _baseUrl: string = environment.baseUrl;
  private _user!: User;

  constructor(private http: HttpClient) { }

  public get user(): User {
    return { ...this._user };
  }

  public login(email: string, password: string): Observable<AuthResponse> {

    const url = this._baseUrl + '/signin';
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.user) {
            this._user = {
              name: resp.user.name,
              password: resp.user.password,
              uuid: resp.user.uuid,
              token: resp.token,
              email: email
            }

            localStorage.setItem('roleUser', resp.user.role!);
            localStorage.setItem('token', resp.token);
            localStorage.setItem('nameUser', resp.user.name);
            localStorage.setItem('mailUser', resp.user.email);
            localStorage.setItem('uuidUser', resp.user.uuid);
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
      );
  }

  public register(name: string, email: string, password: string,  uuid: string): Observable<AuthResponse> {

    const url = this._baseUrl + '/signup';
    const body = { name, email, password, uuid };

    const authRes: Observable<AuthResponse> = this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ token }) => {
          if (token) {

            this._user = {
              name: name,
              password: password,
              uuid: uuid,
              token: token,
              email: email
            }
            localStorage.setItem('token',  token);
            localStorage.setItem('nameUser', name);
            localStorage.setItem('mailUser', email);
            localStorage.setItem('uuidUser', uuid);
            localStorage.setItem('roleUser','USER_ROLE');
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
    );

    return authRes;
  }

  public user2Admin(uuid: string): Observable<AuthResponse> {

    const url = this._baseUrl + '/turn-admin/'+ uuid;
    const body = {};

    const authRes: Observable<AuthResponse> = this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (!resp.ok) {
          console.warn("user not found");
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error))
    )
    return authRes;
    }

  loginValidate(role: string): boolean {
    return (role === localStorage.getItem('roleUser'))
  }

  // TODO: make funtion to pass user admin
  // turn-admin/123141mdasmc

  logout() {
    localStorage.clear();
  }

}
