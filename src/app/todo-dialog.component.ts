import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from './model/Todo';
import { Project } from './model/Project';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from './project.service';
import { TodoService } from './projects/todo/todo.service';
import { plainToClass } from 'class-transformer';

interface DialogData {
  project: Project,
  todo: Todo
}

@Component({
  selector: 'todo-dialog',
  templateUrl: 'todo-dialog.component.html',
})
export class TodoDialogComponent {
  todoForm = new FormGroup({
    text: new FormControl('', Validators.required),
    project_id: new FormControl(this.data?.project?.id || '', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectService: ProjectService,
    private todoService: TodoService
  ) {}

  getProjects() {
    return this.projectService.cached_projects
  }

  onSubmit(): void {
    this.todoService
      .addTodo(plainToClass(Todo, this.todoForm.value))
      .subscribe(todo => {
        this.projectService.cached_projects.find(project => project.id === todo.project_id).todos.push(todo);
        this.dialogRef.close(true);
      });
  }

  trackByFn(index, project) {
    return project.id;
  }
}
