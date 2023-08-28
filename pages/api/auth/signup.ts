import { IUser } from '../../../models/user';

import * as authService from "../../../services/auth.service";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return await post(req, res);
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const user: IUser = req.body;


  if (
    !user.email ||
    !user.email.includes("@")
  ) {
    res.status(422).json({
      message: "invalid email address",
    });
  }

  if (
    !user.password ||
    user.password.trim().length < 4 ||
    !user.fullName
  ) {
    res.status(422).json({
      message: "Password must be at least 4 characters",
    });
  }

  if (
    !user.fullName
  ) {
    res.status(422).json({
      message: "Provide a valid full name",
    });
  }




  try {
    var result = await authService.createUser(user);

    res.status(201).json(result);

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
}

export default handler;
