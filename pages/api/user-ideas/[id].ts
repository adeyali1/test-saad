import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../../services/user-ideas.service";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "DELETE":
      return _delete(req, res);
  }
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const sessionUser: any = await getToken({ req });

    const result = await service.deleteOne(id + "", sessionUser);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default handler;
