import {DataSource} from '@angular/cdk/collections';
import {effect, inject, Injector, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {IProject} from '../interfaces/project.interface';
import {ProjectService} from '../services/project.service';

export class ProjectDataSource extends DataSource<IProject> {

  private readonly _injector = inject(Injector);
  private readonly _projectService = inject(ProjectService);

  private readonly _data = signal<IProject[]>([]);

  public readonly isLoading = signal<boolean>(false);

  constructor() {
    super();

    effect(() => {
      this.load();
    });
  }

  public $data = this.connect();

  public connect(): Observable<readonly IProject[]> {
    return toObservable(this._data, {
      injector: this._injector,
    });
  }

  public disconnect(): void {
  }

  public refresh(): void {
    this.load();
  }

  private load(): void {
    this.isLoading.set(true);
    this._data.set([]);
    this._projectService.getProjects().subscribe({
      next: projects => this._data.set(projects),
      error: error => console.log(error),
      complete: () => this.isLoading.set(false)
    });
  }
}
