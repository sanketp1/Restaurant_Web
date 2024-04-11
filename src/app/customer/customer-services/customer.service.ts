import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  //////// Category Operations

  getAllCategories(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/customer/categories`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Categories Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Categories', []))
      );
  }

  searchCategoryByTitle(title: string): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/customer/categories/${title}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Categories Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Categories', []))
      );
  }


  //////// Product Operations

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/customer/${categoryId}/products`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Products Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Products', []))
      );
  }

  searchProductByTitle(categoryId:number,title: string): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/customer/${categoryId}/products/${title}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Products Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Products', []))
      );
  }


  //////// Reservation Operations

  postReservationRequest(reservationDto: any): Observable<any> {
    reservationDto.userId = UserStorageService.getUserId();
    return this.http
      .post<[]>(BASIC_URL + "api/customer/reservation", reservationDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Reservation posted successfully')),
        catchError(this.handleError<[]>('Error posting Reservation', []))
      );
  }

  getAllReservationsRequests(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/customer/reservations/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Reservations Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Reservations', []))
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

