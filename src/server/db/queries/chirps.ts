import { Query } from "..";
import { ChirpWUser } from "../../../types";

const getAll = () => Query<ChirpWUser[]>(
    `SELECT
    u.name as username,
    c.*
    FROM chirps c
    JOIN users u on c.userid = u.id
    ORDER BY c.id`);

const getById = (id: number) => Query<ChirpWUser[]>(
    `SELECT
    u.name as username,
    c.*
    FROM chirps c
    JOIN users u on c.userid = u.id 
    WHERE c.id=?`, [id]);

const create = (userid: number, content: string) => Query("INSERT INTO chirps (userid, content) VALUES (?, ?)", [userid, content]);
const update = (id: number, content: string, userid: number) => Query("UPDATE chirps SET content=? WHERE id=? AND userid=?", [content, id, userid]);
const destroy = (id: number, userid: number) => Query("DELETE FROM chirps WHERE id=? AND userid=?", [id, userid]);

export default {
    getAll,
    getById,
    create,
    update,
    destroy
};