import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserService = {
  registerUser: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return user;
  },

  loginUser: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("잘못된 이메일 또는 비밀번호입니다.");
    }
    // 실제로는 토큰 생성 로직이 필요합니다.
    const { name, _id, image } = user;
    const token = generateToken(user._id);
    const payload = {
      name,
      _id,
      token,
      image,
    };
    return payload;
  },
  findUserByEmail: async (email) => {
    const user = await User.findOne({ email });
    return user;
  },
  findUserById: async (id) => {
    const user = await User.findById(id);
    return user;
  },

  updateUser: async (id, name, image) => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );
    return updatedUser;
  },
  updatePassword: async (id, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    return updatedUser;
  },

  deleteUser: async (id) => {
    await User.findByIdAndDelete(id);
  },
};

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SECRETE, { expiresIn: "1h" });
  return token;
};

export default UserService;
