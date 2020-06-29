import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../model/Project';
import { Todo } from '../model/Todo';
import { TodoService } from './todo/todo.service';
import { TodoDialogComponent } from '../todo-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.css']
})
export class ProjectComponent {
  @Input() project: Project;

  constructor(private todoService: TodoService, public dialog: MatDialog) { }

  public setCompleted(todo: Todo) {
    todo.completed = !todo.completed;

    this.todoService.updateTodo(todo).subscribe(new_todo => todo = new_todo);
  }

  openAddTodoDialog(): void {
    this.dialog.open(TodoDialogComponent, {width: '250px', data: {project: this.project}});
  }
}
