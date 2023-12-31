export interface User {
    id?: number; // pk auto_increment
    name: string;
    email: string;
    password?: string;
    _created?: string | Date;
};

export interface UserWMentions extends User {
    chirpid?: ChirpWUser['id'];
    content?: ChirpWUser['content'];
    chirp_author_name?: ChirpWUser['username'];
    chirp_author_id?: ChirpWUser['userid'];
    chirp_created?: ChirpWUser['_created'];
};

export interface Chirp {
    id?: number; // pk auto_increment
    userid: User['id']; // fk refs User.id
    content: string;
    location?: string;
    _created?: string | Date;
};

export interface ChirpWUser extends Chirp {
    username: User['name']; // fk refs User.name
};

export interface Mention {
    userid: User['id']; // fk refs User.id
    chirpid: Chirp['id']; // fk refs Chirp.id
};

export interface UsersTable {
    id?: number;
    email?: string;
    password?: string;
    _created?: string | Date;
};

export interface MysqlResponse {
    affectedRows: number;
    insertId: number;
};

export interface Payload {
    email: string;
    userid: number;
    role: number;
};

declare global {
    namespace Express {
        interface User extends Payload { }
    }
};