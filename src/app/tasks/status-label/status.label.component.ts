import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, input, signal } from '@angular/core';

@Component({
  selector: 'status-label',
  template: `
    @switch (status()) {
      @case ('todo') {
        <div class="flex">
          <img title="To-do" class="w-10" src="icons/todo-icon.svg" />
          @if (!isMobileView()) {
            <em class="my-auto text-purple-500">To-do</em>
          }
        </div>
      }
      @case ('inprogress') {
        <div class="flex">
          <img title="In progress" class="w-10" src="icons/inprogress-icon.svg" />
          @if (!isMobileView()) {
            <em class="my-auto text-yellow-500">In-progress</em>
          }
        </div>
      }
      @case ('done') {
        <div class="flex">
          <img title="Done" class="w-10" src="icons/done-icon.svg" />
          @if (!isMobileView()) {
            <em class="my-auto text-green-500">Done</em>
          }
        </div>
      }
      @default {
        {{ status() }}
      }
    }
  `,
})
export class StatusLabelComponent {
  public status = input<string | undefined>(undefined);
  public isMobileView = signal<boolean>(false);
  private breakpointobserver = inject(BreakpointObserver);
  constructor() {
    this.breakpointobserver.observe('(max-width: 600px)').subscribe((value) => {
      this.isMobileView.set(value.matches);
    });
  }
}
