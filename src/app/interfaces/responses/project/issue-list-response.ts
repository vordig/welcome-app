import {IssuePriority, IssueState} from '../../../types/issue.types';

export interface IIssueListResponse {
    id: string;
    projectId: string;
    projectCode: string;
    name: string;
    priority: IssuePriority;
    state: IssueState;
    createdOn: Date;
    modifiedOn: Date;
}
