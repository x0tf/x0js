export default interface element {
    namespace: string;
    key: string;
    type: number;
    data: string;
}

export class Element {
    namespace: string;
    key: string;
    type: string;
    data: string;
    constructor(raw: any) {
        this.namespace = raw.namespace;
        this.key = raw.key;
        this.type = raw.type === 0 ? 'paste' : 'redirect'; // 0 - paste, 1 - redirect
        this.data = raw.data;
    }
}