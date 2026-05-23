import { pool } from "../../../db";
import { ISSUES_PAYLOAD } from "../../types";

const createIssues = async (payload: ISSUES_PAYLOAD, user: any) => {
  const insertQuery = `
      INSERT INTO issues (title, description, type,reporter_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

  const result = await pool.query(insertQuery, [
    payload.title,
    payload.description,
    payload.type,
    user.id,
  ]);
  return result.rows[0];
};
const getAllIssues = async (payload: any) => {
  const query = `
SELECT 
    i.*,
    jsonb_build_object(
        'id', u.id,
        'name', u.name,
        'role', u.role
    ) AS reporter
FROM issues i
INNER JOIN users u 
    ON i.reporter_id = u.id
WHERE
    ($1::text IS NULL OR i.type = $1)
    AND
    ($2::text IS NULL OR i.status = $2)
ORDER BY
    CASE WHEN $3 = 'oldest' THEN i.created_at END ASC,
    CASE WHEN $3 = 'newest' THEN i.created_at END DESC;
`;

  const result = await pool.query(query, [
    payload.type,
    payload.status,
    payload.sort,
  ]);
  return result.rows;
};
const getIssueById = async (id: string) => {
  const query = `
SELECT 
    i.*,
    jsonb_build_object(
        'id', u.id,
        'name', u.name,
        'role', u.role
    ) AS reporter
FROM issues i
INNER JOIN users u 
    ON i.reporter_id = u.id
WHERE
    i.id = $1
`;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};
export const IssuesServices = {
  createIssues,
  getAllIssues,
  getIssueById,
};
