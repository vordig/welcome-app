import {DataSource} from '@angular/cdk/collections';
import {effect, inject, Injector, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';

export abstract class BaseDataSource<TDataType> extends DataSource<TDataType> {

  private readonly _injector = inject(Injector);

  private readonly _data = signal<TDataType[]>([]);

  protected readonly isInit = signal<boolean>(false);

  public readonly isLoading = signal<boolean>(false);

  constructor(isReady: boolean = true) {
    super();

    this.isInit.set(isReady);

    effect(() => {
      if(!this.isInit()) return;
      this.load();
    });
  }

  public $data = this.connect();

  public connect(): Observable<readonly TDataType[]> {
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
    this.getData().subscribe({
      next: data => this._data.set(data),
      error: error => console.log(error),
      complete: () => this.isLoading.set(false)
    });
  }

  protected abstract getData(): Observable<TDataType[]>;
}
