export class Note {
    id: number;
    name: string;
    description: string;
    userId: number;
    done: boolean;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.done = false;
    }
}