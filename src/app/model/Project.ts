import { Type } from 'class-transformer';
import { Todo } from './Todo';

export class Project {
  id: number;
  title: string;

  @Type(() => Todo)
  todos: Todo[];

  @Type(() => Date)
  created_at: Date;
  @Type(() => Date)
  updated_at: Date;
}
