import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../services/db.service";
import { User } from "../../../models/user";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return _post(req, res);
  }
}

async function _post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    console.log(user);
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
