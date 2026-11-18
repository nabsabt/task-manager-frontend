import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '../core/interfaces/task.manager.interface';
import { KeyValuePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SocketService } from '../core/services/socket.service';

@Component({
  selector: 'app-table',
  templateUrl: './task-table.component.html',
  providers: [TaskService],
  imports: [KeyValuePipe],
})
export class TaskTableComponent implements OnInit {
  private tableService = inject(TaskService);
  private socketService = inject(SocketService);

  public router = inject(Router);

  public tableData = signal<Array<Task> | undefined>(undefined);
  public cols = signal<Array<string>>(['ID', 'Name', 'Status', 'Description']);
  public paginatorVal = signal<5 | 10 | 15 | 20>(5);
  public currentPage = signal<number>(0);
  public numberOfPages = signal<number>(0);
  public colWidthRatio = signal<Array<number>>([1, 1, 1, 2]);
  public calculatedColWidth = computed(() => {
    const ratios = this.colWidthRatio();

    const colCount = this.cols().length;

    if (!colCount) return [];
    const values = ratios ?? Array(colCount).fill(1);
    const totalUnit = values.reduce((sum, ratio) => sum + ratio, 0);
    return values.map((ratio) => `${(ratio / totalUnit) * 100}%`);
  });

  constructor() {}
  ngOnInit(): void {
    this.socketService.socketEvents$.subscribe((event) => {
      if (event.action === 'delete' && event.data?._id) {
        this.deleteItemFromTable(event.data._id);
      }
    });
    this.fetchData();
  }

  private fetchData() {
    this.tableService.fetchTasks(this.currentPage(), this.paginatorVal()).subscribe({
      next: (res: { tasks: Array<Task>; datalength: number }) => {
        this.tableData.set(res.tasks);
        this.numberOfPages.set(Math.ceil(res.datalength / this.paginatorVal()));
      },
    });
  }

  public onPaginatorValueSelected(event: any) {
    const value = Number(event.value) as 5 | 10 | 15 | 20;
    this.paginatorVal.set(value);
    this.currentPage.set(0);
    this.fetchData();
  }

  public onPageStep(step: number) {
    this.currentPage.set(this.currentPage() + step);
    this.fetchData();
  }

  private deleteItemFromTable(id: string) {
    this.tableData.update((tasks) => tasks?.filter((task) => task._id !== id));
  }
}
