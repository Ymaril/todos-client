import { Component, Input } from '@angular/core';
import { Project } from '../model/Project';
import { Todo } from '../model/Todo';
import { TodoService } from './todo/todo.service';

@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.css']
})
export class ProjectComponent {
  @Input() project: Project;

  constructor(private todoService: TodoService) { }

  public setCompleted(todo: Todo) {
    todo.completed = !todo.completed;

    this.todoService.updateTodo(todo).subscribe(new_todo => todo = new_todo);
  }
}
