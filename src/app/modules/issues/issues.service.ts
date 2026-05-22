const createIssues = async (payload: { email: string; password: string }) => {};
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
