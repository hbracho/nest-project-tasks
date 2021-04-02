export interface Task {
    id: string,
    title: string,
    description: string,
    status: StatusTask
}

export enum StatusTask {
    OPEN ='OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}