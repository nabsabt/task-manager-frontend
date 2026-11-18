import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../../core/interfaces/task.manager.interface';
import { form, FormField, required } from '@angular/forms/signals';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-task',
  templateUrl: './manage-task.component.html',
  imports: [FormField],
  providers: [TaskService],
})
export class ManageTaskComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);
  private socketService = inject(SocketService);
  private id = signal<string | undefined>(undefined);
  private taskEditModel = signal<Task>({
    _id: undefined,
    name: '',
    description: '',
    status: 'todo',
  });
  public taskForm = form(this.taskEditModel, (schemaPath) => {
    (required(schemaPath.name, { message: 'Some name is required!' }),
      required(schemaPath.status, { message: 'Status required!' }));
  });

  public task = signal<Task | undefined>(undefined);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      params['id'] === 'new' ? '' : this.id.set(params['id']);
    });
  }
  ngOnInit(): void {
    /**
     * If task is deleted meanwhile being edited,
     * client is navigated back.
     */
    this.socketService.socketEvents$.subscribe((event) => {
      if (event.action === 'delete' && event.data?._id === this.id()) {
        this.router.navigate(['/tasks']);
      }
    });
    this.id()
      ? this.taskService.fetchTaskByID(this.id() as string).subscribe({
          next: (res: { task: Task }) => {
            this.task.set(res.task);
            this.taskEditModel.set({
              _id: this.id() as string,
              name: res.task.name,
              description: res.task.description,
              status: res.task.status,
            });
          },
        })
      : '';
  }

  public OnSubmitTask() {
    this.taskService.postEditedTask(this.taskEditModel()).subscribe({
      next: (res: { status: string }) => {
        this.router.navigate(['/tasks']);
      },
    });
  }

  public onDeleteTask() {
    this.id()
      ? this.taskService.deleteTask(this.id() as string).subscribe({
          next: (res: { status: string }) => {
            this.router.navigate(['/tasks']);
          },
        })
      : '';
  }
}
