import { Component, OnInit } from '@angular/core';
import { Project } from './model/Project';

import { ProjectService } from './project.service'
import { TodoDialogComponent } from './todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  openAddTodoDialog(): void {
    this.dialog.open(TodoDialogComponent, {width: '250px'});
  }

  trackByFn(index, project) {
    return project.id;
  }
}
