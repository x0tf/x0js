export class InvalidTokenObject extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidTokenObject'
    }
}