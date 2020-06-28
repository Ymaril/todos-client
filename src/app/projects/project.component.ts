import { Component, Input } from '@angular/core';
import { Project } from '../model/Project';

@Component({
  selector: 'app-project',
  template: `
    <mat-card class="mat-elevation-z4">
      <mat-card-title>{{project.title}}</mat-card-title>
      <mat-card-content>
        <mat-selection-list>
          <mat-list-option *ngFor="let todo of project.todos">
            {{todo.text}}
          </mat-list-option>
        </mat-selection-list>
      </mat-card-content>
    </mat-card>
  `
})
export class ProjectComponent {
  @Input() project: Project;
}
