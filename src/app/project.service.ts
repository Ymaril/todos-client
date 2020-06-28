import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Project } from './model/Project';
import { plainToClass } from 'class-transformer';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectsUrl = 'https://mighty-dawn-42014.herokuapp.com/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<any[]>(this.projectsUrl, {responseType: 'json'})
      .pipe(
        map(data => plainToClass(Project, data)),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} ${error}`);
      return of(result as T);
    };
  }
}
