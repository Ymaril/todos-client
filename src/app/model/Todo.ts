import { Type } from 'class-transformer';

export class Todo {
  id: number;
  text: string;
  completed: boolean;
  project_id: number;

  @Type(() => Date)
  created_at: Date;
  @Type(() => Date)
  updated_at: Date;
}
