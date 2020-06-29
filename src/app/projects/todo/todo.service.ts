import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Todo } from '../../model/Todo';
import { plainToClass } from 'class-transformer';

import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosUrl = `${environment.api_url}todos`;

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, {todo: todo})
      .pipe(
        map(data => plainToClass(Todo, data)),
        catchError(this.handleError<Todo>('addTodo', todo))
      );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;

    return this.http.patch<Todo>(url, {todo: todo})
      .pipe(
        map(data => plainToClass(Todo, data)),
        catchError(this.handleError<Todo>('updateTodo', todo))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} ${error}`);
      return of(result as T);
    };
  }
}
