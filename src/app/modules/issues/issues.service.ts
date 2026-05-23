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
const getIssueById = async (id: string) => {
  return {
    message:
      "Issue retrieved successfully lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
  };
};
export const IssuesServices = {
  createIssues,
  getIssueById,
};
