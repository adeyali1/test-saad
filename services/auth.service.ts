import { hash, compare } from "bcryptjs";
import { dbConnect } from "./db.service";
import { IUser, User } from "../models/user";

const USERS_COLLECTION = "users";

export async function createUser(user: IUser) {
  try {
    await dbConnect();

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await hash(user.password, 12);

    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      provider: 'credentials',
      role: 'client'
    } as IUser);

    await newUser.save();
    return newUser;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login(credentials: { email: string, password: string }) {
  try {
    await dbConnect();
    const result = await User.findOne({ email: credentials.email });

    if (!result) {
      throw new Error("invalid email");
    }

    const isValid = await compare(credentials.password, result.password);
    if (!isValid) {
      throw new Error("invalid password");
    }
    const user = result?.toJSON();
    return { email: user.email, role: user.role, id: user.id, fullName: user.fullName };
  } catch (error) {
    console.log(error);
  }
}
