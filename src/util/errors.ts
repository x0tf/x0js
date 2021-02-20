export class x0ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'x0ApiError'
    }
}

export const errorHandler = (e: any) => {
    if (typeof e === 'string' && e.includes("messages")) {
        JSON.parse(e).messages.forEach((message: string) => {
            throw new x0ApiError(message);
        });
    }
};
