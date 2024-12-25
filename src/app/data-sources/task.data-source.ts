import {DataSource} from '@angular/cdk/collections';
import {ITask} from '../interfaces/task.interface';
import {Observable} from 'rxjs';
import {effect, inject, Injector, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {TaskService} from '../services/task.service';

export class TaskDataSource extends DataSource<ITask> {

  private readonly _injector = inject(Injector);
  private readonly _taskService = inject(TaskService);

  private readonly _data = signal<ITask[]>([]);
  private readonly _searchTerm = signal<string>('');

  public readonly isLoading = signal<boolean>(false);

  constructor() {
    super();

    effect(() => {
      this.load(this._searchTerm());
    });
  }

  public $data = this.connect();

  public connect(): Observable<readonly ITask[]> {
    return toObservable(this._data, {
      injector: this._injector,
    });
  }

  public disconnect(): void {
  }

  public search(searchTerm: string): void {
    this._searchTerm.set(searchTerm);
  }

  private load(searchTerm: string): void {
    this.isLoading.set(true);
    this._data.set([]);
    this._taskService.getTasks(searchTerm).subscribe({
      next: tasks => this._data.set(tasks),
      error: error => console.log(error),
      complete: () => this.isLoading.set(false)
    });
  }
}
