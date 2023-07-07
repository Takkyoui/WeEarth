import UserService from "../service/userService.js";
import path from "path";
import fs from "fs";
const UserController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await UserService.findUserByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "해당 이메일은 이미 등록되어 있습니다." });
      }
      const user = await UserService.registerUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "사용자 등록 중 오류가 발생했습니다." });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const payload = await UserService.loginUser(email, password);
      res.status(200).json(payload);
    } catch (error) {
      res.status(401).json({ error: "잘못된 이메일 또는 비밀번호입니다." });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { newPassword } = req.body;
      const updatedUser = await UserService.updatePassword(userId, newPassword);
      res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: "비밀번호 업데이트 중 오류가 발생했습니다." });
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = req.user.userId;
      const file = req.file;
      const { name } = req.body;
      let image = "";
      if (file) {
        // 기존 이미지 삭제
        const user = await UserService.findUserById(id);
        console.log(user);
        if (user && user.image) {
          const imagePath = path.resolve("public", user.image);

          console.log(imagePath);
          fs.unlinkSync(imagePath);
        }
        image = file.path.replace("public/", "");
      }
      console.log({ name, image });
      const updatedUser = await UserService.updateUser(id, name, image);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "계정 업데이트 중 오류가 발생했습니다." });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = req.user.userId;
      await UserService.deleteUser(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "계정 삭제 중 오류가 발생했습니다." });
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await UserService.findUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "사용자 정보를 가져오는 중 오류가 발생했습니다." });
    }
  },
};

export default UserController;
