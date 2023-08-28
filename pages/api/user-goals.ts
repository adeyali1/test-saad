import { NextApiRequest, NextApiResponse } from "next";
import * as service from "../../services/user-goals.service";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return await _put(req, res);
    case "POST":
      return await _post(req, res);
    case "GET":
      return _get(req, res);
  }
}

async function _get(req: NextApiRequest, res: NextApiResponse) {
  try {

    const sessionUser: any = await getToken({ req });

    if (!sessionUser?.id) throw new Error("You are not logged in !");


    const result = await service.getOne(sessionUser.id, req.query.date + "");
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userGoals = req.body;
    const result = await service.insertOne(userGoals);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function _put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userGoals } = req.body;
    const result = await service.updateOne(userGoals);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
