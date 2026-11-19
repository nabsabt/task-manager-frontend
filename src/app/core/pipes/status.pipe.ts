import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'statusPipe',
})
export class StatusPipe implements PipeTransform {
  transform(value: string | undefined): string {
    switch (value) {
      case 'todo':
        return `
        <div class="flex">
                          <img title="To-do" class="w-10" src="icons/todo-icon.svg" />
                          <em class="my-auto text-purple-500">To-do</em>
                        </div>
        `;
      case 'inprogress':
        return `
        <div class="flex">
                          <img title="In progress" class="w-10" src="icons/inprogress-icon.svg" />
                          <em class="my-auto text-yellow-500">In-progress</em>
                        </div>
        `;
      case 'done':
        return `
        <div class="flex">
                          <img title="Done" class="w-10" src="icons/done-icon.svg" />

                          <em class="my-auto text-green-500">Done</em>
                        </div>
        `;
      case undefined:
        return '';
      default:
        return value;
    }
  }
}
