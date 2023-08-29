import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../services/db.service";
import { User } from "../../../models/user";
import JWT, { JwtPayload } from "jsonwebtoken";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return _post(req, res);
  }
}

async function _post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;
    const { token } = req.body;
    if (token) {
      console.log(token);
      const data = JWT.verify(token, "secrethere");
      let { id } = data as JwtPayload;
      const user = await User.findById(id);
      console.log(user);
      res.status(200).json({ user });
    } else {
      const user = await User.findOne({ email }).select("-password");
      const token = JWT.sign({ id: user._id }, "secrethere", {
        expiresIn: "30d",
      });
      res.status(200).json({ user, token });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default handler;
