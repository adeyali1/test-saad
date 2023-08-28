import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../services/db.service";
import { User } from "../../../models/user";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return _put(req, res);
  }
}

async function _put(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.headers;
    console.log(id);
    const user = await User.findById(id).select("-password");
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.status = !user.status;
    await user.save();
    res.status(200).json({ user, success: true });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
