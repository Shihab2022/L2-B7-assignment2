import { Request, Response } from "express";

export const testingRoute = (req: Request, res: Response) => {
  res.send({
    message: `Hi Guys, Welcome to the Server ! . Server is up and running 🚀`,
  });
};
