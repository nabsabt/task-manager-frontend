import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { TableService } from './table.service';
import { Task } from '../core/interfaces/task.manager.interface';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [TableService],
  imports: [KeyValuePipe],
})
export class TableComponent implements OnInit {
  private tableService = inject(TableService);

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

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.tableService.fetchTableData(this.currentPage(), this.paginatorVal()).subscribe({
      next: (res: { tasks: Array<Task>; datalength: number }) => {
        this.tableData.set(res.tasks);
        this.numberOfPages.set(Math.ceil(res.datalength / this.paginatorVal()));
      },
    });
  }

  public onItemSelected(id: string) {
    console.log(`item selected: ${id}`);
  }

  public onPaginatorValueSelected(event: any) {
    const value = Number(event.value) as 5 | 10 | 15 | 20;
    console.log(`pagination changed to ${value}`);
    this.paginatorVal.set(value);
    this.currentPage.set(0);
    this.fetchData();
  }

  public onPageStep(step: number) {
    this.currentPage.set(this.currentPage() + step);
    this.fetchData();
  }
}
