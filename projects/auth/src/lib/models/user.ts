export interface IUser {
    id: string;
    username: string;
    email: string;
    token?: string;
}

export class User {
    public id: string;
    public username: string;
    public email: string;
    public token?: string;

    public constructor(params: IUser) {
        if (params.id == null) {
            throw new Error("Missing ID in User");
        }
        if (params.username == null) {
            throw new Error("Missing username in User");
        }
        if (params.email == null) {
            throw new Error("Missing email in User");
        }
        this.id = params.id;
        this.username = params.username;
        this.email = params.email;

        if (params.token) {
            this.token = params.token;
        }
    }
}
