import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //////// Category Operations

  addCategory(categoryDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/admin/category", categoryDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Category posted successfully')),
        catchError(this.handleError<[]>('Error posting Category', []))
      );
  }

  getAllCategories(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/categories`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Categories Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Categories', []))
      );
  }

  searchCategoryByTitle(title: string): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/categories/${title}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Categories Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Categories', []))
      );
  }


  //////// Product Operations

  addProduct(categoryId: number, productDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + `api/admin/${categoryId}/product`, productDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Product posted successfully')),
        catchError(this.handleError<[]>('Error posting Product', []))
      );
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/${categoryId}/products`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Products Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Products', []))
      );
  }

  searchProductByTitle(categoryId: number, title: string): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/${categoryId}/products/${title}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Products Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Products', []))
      );
  }

  getProductById(productId: number): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/product/${productId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Product Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Product', []))
      );
  }

  updateProduct(productId: any, productDto: any): Observable<any> {
    return this.http
      .put<[]>(BASIC_URL + `api/admin/product/${productId}`, productDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Product Updated successfully')),
        catchError(this.handleError<[]>('Error updating Product', []))
      );
  }


  deleteProduct(productId: any): Observable<any> {
    return this.http
      .delete<[]>(BASIC_URL + `api/admin/product/${productId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Product Deleted successfully')),
        catchError(this.handleError<[]>('Error Deleting Product', []))
      );
  }


  //////// Reservation Operations

  getAllReservationsRequest(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/reservations`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Reservations Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Reservations', []))
      );
  }

  changeReservationStatus(reservationId: number, status: string): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/reservation/${reservationId}/${status}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Reservation Approved successfully')),
        catchError(this.handleError<[]>('Error Approving Reservation.', []))
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
