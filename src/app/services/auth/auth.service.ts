import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = environment['BASIC_URL'];
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginRequest: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + "api/auth/login", loginRequest);
  }

  register(data): Observable<any> {
    console.log(data);
    return this.http.post(BASIC_URL + "api/auth/signup", data);
  }

  getUserById(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http
      .get<[]>(BASIC_URL + `api/auth/user/${userId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('User Fetched successfully')),
        catchError(this.handleError<[]>('Error Fetching User', []))
      );
  }

  updateUser(data): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + `api/auth/update`, data, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('User Updated successfully')),
        catchError(this.handleError<[]>('Error Updating User', []))
      );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }


  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
