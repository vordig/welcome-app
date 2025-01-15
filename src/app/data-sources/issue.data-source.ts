import {effect, inject, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {IIssue} from '../interfaces/issue.interface';
import {IssueService} from '../services/issue.service';
import {BaseDataSource} from './base.data-source';

export class IssueDataSource extends BaseDataSource<IIssue> {

  private readonly _issueService = inject(IssueService);

  public readonly projectId = signal<string>('');

  constructor() {
    super(false);

    effect(() => {
      if(!this.projectId) return;
      this.isInit.set(true);
    });
  }

  protected override getData(): Observable<IIssue[]> {
    return this._issueService.getIssues(this.projectId());
  }
}
