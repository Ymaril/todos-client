import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Todo } from '../../model/Todo';
import { plainToClass } from 'class-transformer';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosUrl = 'https://mighty-dawn-42014.herokuapp.com/todos';

  constructor(private http: HttpClient) { }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;

    return this.http.patch<any[]>(url, {todo: todo})
      .pipe(
        map(data => plainToClass(Todo, data as Object)),
        catchError(this.handleError<Todo>('setCompleted', todo))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} ${error}`);
      return of(result as T);
    };
  }
}
