import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { Task } from '../core/interfaces/task.manager.interface';
import { environment } from '../../environments/environment';
import { LoaderService } from '../core/services/loader.service';

@Injectable()
export class TableService {
  private readonly http = inject(HttpClient);
  private loaderService = inject(LoaderService);

  public fetchTableData(
    page: number,
    limit: number,
  ): Observable<{ tasks: Array<Task>; datalength: number }> {
    this.loaderService.showLoader();
    return this.http
      .get<{ tasks: Array<Task>; datalength: number }>(`${environment.apiURL}task/getTasks`, {
        params: { page, limit },
      })
      .pipe(
        map((res: { tasks: Array<Task>; datalength: number }) => {
          return res;
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message ?? error));
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
      );
  }
}
