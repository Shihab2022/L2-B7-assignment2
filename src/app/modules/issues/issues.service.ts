import { CONTRIBUTOR, MAINTAINER } from "../../../constant/common";
import { pool } from "../../../db";
import AppError from "../../errors/ApiError";
import { ISSUES_PAYLOAD } from "../../types";
import httpStatus from "http-status";

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

const updateIssueById = async (id: string, user: any, updates: any) => {
  const keys = Object.keys(updates);
  if (keys.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "No data provided for update");
  }
  const query = `
SELECT 
  *
FROM issues 
WHERE
  id = $1
`;

  const result = await pool.query(query, [id]);
  const issue = result.rows[0];
  if (!issue) {
    throw new AppError(httpStatus.NOT_FOUND, "Issue not found");
  }
  let issueUpdateStatus = false;
  if (issue.reporter_id !== user.id) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not the reporter of this issue",
    );
  }
  if (user.role === MAINTAINER) {
    issueUpdateStatus = true;
  }
  if (
    user.role === CONTRIBUTOR &&
    issue.status === "open" &&
    issue.reporter_id === user.id
  ) {
    issueUpdateStatus = true;
  }

  if (!issueUpdateStatus) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not allowed to update this issue",
    );
  } else {
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = Object.values(updates);
    values.push(id);

    // 3. Execute (Example using 'pg' for PostgreSQL)
    const query = `
    UPDATE issues 
    SET ${setClause} 
    WHERE id = $${values.length} 
    RETURNING *;
  `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }
};
const deleteIssueById = async (id: string, user: any) => {
  if (user.role !== MAINTAINER) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only maintainers can delete issues",
    );
  }

  const query = `
    DELETE FROM issues WHERE id = $1`;
  await pool.query(query, [id]);
  return {};
};
export const IssuesServices = {
  createIssues,
  getAllIssues,
  getIssueById,
  updateIssueById,
  deleteIssueById,
};
