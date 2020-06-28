import { Component, OnInit } from '@angular/core';
import { Project } from './model/Project';

import { ProjectService } from './project.service'

@Component({
  selector: 'app-projects',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span class="fill-space"></span>
        <span>Todos</span>
        <span class="fill-space"></span>
      </mat-toolbar-row>
    </mat-toolbar>
    <div class="content" fxLayout="row wrap" fxLayoutGap="16px grid">
      <app-project fxFlex="33%" fxFlex.xs="100%" *ngFor="let project of projects" [project]="project"></app-project>
    </div>
  `,
  styleUrls: ['projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

}
