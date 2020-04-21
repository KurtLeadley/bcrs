/**
 * Title: interceptor/http-jwt.interceptor.ts
 * Authors: Group 4
 * Description: bcrs
 */
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, delay, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpJwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private auth: AuthService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken();

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });

    return next.handle(authRequest).pipe(
      tap(
        (event: HttpEvent<any>) => {
          this.showLoader();

          if (event instanceof HttpResponse) {
            setTimeout(() => {
              this.onEnd();
            }, 500);
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Client Error: ${error.error.message}`;
              console.log(errorMessage);
            } else {
              this._snackBar.open(error.error.message, 'X', {
                duration: 2000,
              });
              errorMessage = `Server-side Error: Status Code: ${error.status}\nMessage: ${error.message}`;
            }
            console.log(error.message);

            this.onEnd();

            if (error.status !== 500) {
              return;
            }

            this.router.navigate(['/error/500']);
          }
        }
      )
    );
  }

  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}
