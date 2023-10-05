export interface ITask {
    name: string,
    favorite: boolean,
    editState: boolean,
    children: ITask[],
    toggle: boolean,
}

export interface iProject {
    name: null | string,
    tasks: ITask[],
    filter: null | string,
}