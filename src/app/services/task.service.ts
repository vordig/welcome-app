import {Injectable} from '@angular/core';
import {ITask} from '../interfaces/task.interface';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Array<ITask> = [
    {
      title: "First task",
      description: "First task description"
    },
    {
      title: "Second task",
      description: "Second task description"
    }
  ];

  public getTasks(searchTerm: string): Observable<ITask[]> {
    return of(
      this._tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
      .pipe(delay(1000));
  }
}
