import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { Task } from '../core/interfaces/task.manager.interface';
import { environment } from '../../environments/environment';
import { LoaderService } from '../core/services/loader.service';
import { AlertService } from '../core/services/alert.service';

@Injectable()
export class TaskService {
  private readonly http = inject(HttpClient);
  private loaderService = inject(LoaderService);
  private alert = inject(AlertService);

  public fetchTasks(
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
          this.alert.showAlert(error.error.message ?? error);
          return throwError(() => new Error(error.error.message ?? error));
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
      );
  }

  public fetchTaskByID(id: string): Observable<{ task: Task }> {
    this.loaderService.showLoader();
    return this.http.get<{ task: Task }>(`${environment.apiURL}task/getTask/${id}`).pipe(
      map((res: { task: Task }) => {
        return res;
      }),
      catchError((error) => {
        this.alert.showAlert(error.error.message ?? error);
        return throwError(() => new Error(error.error.message ?? error));
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      }),
    );
  }

  public postEditedTask(task: Task): Observable<{ status: string }> {
    this.loaderService.showLoader();
    return this.http
      .post<{ status: string }>(`${environment.apiURL}task/postEditedTask`, { task })
      .pipe(
        map((res: { status: string }) => {
          this.alert.showAlert(res.status);
          return res;
        }),
        catchError((error) => {
          this.alert.showAlert(error.error.message ?? error);
          return throwError(() => new Error(error.error.message ?? error));
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
      );
  }

  public deleteTask(id: string): Observable<{ status: string }> {
    this.loaderService.showLoader();
    return this.http
      .delete<{ status: string }>(`${environment.apiURL}task/deleteTask`, { params: { id } })
      .pipe(
        map((res: { status: string }) => {
          this.alert.showAlert(res.status);
          return res;
        }),
        catchError((error) => {
          this.alert.showAlert(error.error.message ?? error);
          return throwError(() => new Error(error.error.message ?? error));
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
      );
  }
}
