export default interface IUser {
    id?: any | null;
    username?: string | null;
    email?: string;
    password?: string;
    token?: string;
    roles?: Array<string>;
}
