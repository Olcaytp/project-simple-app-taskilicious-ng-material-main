export interface Task {
    id: number;
    categoryId: number;
    name: string;
    teamMembers: {
        id: number;
        name: string;
        avatar: string;
    };
    teamMemberIds: string[];
}
