import { Query } from "..";
import { Chirp, MysqlResponse, User, UserWMentions, UsersTable } from "../../../types";

const getAll = () => Query<User[]>("SELECT * FROM users");

const getById = (id: number) => Query<User>("SELECT * FROM users WHERE id = ?", [id]);

const getChirps = (userid: number) => Query<Chirp[]>(`SELECT * FROM chirps WHERE userid = ?`, [userid]);

const getMentionsById = (id: number) => Query<UserWMentions[]>(
    `SELECT u.*, c.id as chirpid, c.content, a.name as chirp_author_name, c.userid as chirp_author_id, c._created
    FROM chirps c
    JOIN mentions m on c.id = m.chirpid
    JOIN users u on m.userid = u.id
    JOIN users a on c.userid = a.id
    WHERE m.userid = ?`, [id]);


const update = (id: number, name: string, email: string) => Query("UPDATE users SET name=?, email=? WHERE id=?", [name, email, id]);
const destroy = (id: number) => Query("DELETE FROM users WHERE id=?", [id]);

const find = (column: string, value: string) => Query<UsersTable[]>('SELECT * FROM users WHERE ?? = ?', [column, value]);
const insert = (newUser: { name: string, email: string, password: string }) => Query<MysqlResponse>('INSERT INTO users SET ?', [newUser]);

export default {
    getAll,
    getById,
    getChirps,
    getMentionsById,
    update,
    destroy,
    find,
    insert
}; 