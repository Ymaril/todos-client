import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Project } from './model/Project';
import { plainToClass } from 'class-transformer';

import { environment } from "../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectsUrl = `${environment.api_url}projects`;
  public cached_projects: Project[] = [];

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl, {responseType: 'json'})
      .pipe(
        map(data => plainToClass(Project, data)),
        tap(projects => this.cached_projects = projects),
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
