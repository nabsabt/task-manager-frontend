import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../../core/interfaces/task.manager.interface';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  imports: [FormField],
  providers: [TaskService],
})
export class TaskComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);
  private id: string;
  private taskEditModel = signal<Task>({
    _id: '',
    name: '',
    description: '',
    status: 'inprogress',
  });
  public taskForm = form(this.taskEditModel, (schemaPath) => {
    (required(schemaPath.name, { message: 'Some name is required!' }),
      required(schemaPath.status, { message: 'Status required!' }));
  });

  public task = signal<Task | undefined>(undefined);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.taskService.fetchTaskByID(this.id).subscribe({
      next: (res: { task: Task }) => {
        this.task.set(res.task);
        this.taskEditModel.set({
          _id: this.id,
          name: res.task.name,
          description: res.task.description,
          status: res.task.status,
        });
      },
    });
  }

  public OnSubmitTask() {
    this.taskService.postEditedTask(this.taskEditModel()).subscribe({
      next: (res: { status: string }) => {
        alert(res.status);
        this.router.navigate(['/tasks']);
      },
    });
  }

  public onDeleteTask() {
    this.taskService.deleteTask(this.id).subscribe({
      next: (res: { status: string }) => {
        alert(res.status);
        this.router.navigate(['/tasks']);
      },
    });
  }
}
