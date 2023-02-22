export interface Task {
    id: number;
    categoryId: number;
    name: string;
    teamMemberIds: {
        id: number;
        name: string;
        avatar: string;
    }
}
