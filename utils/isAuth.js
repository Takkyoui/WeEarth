import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const token = authorization.slice(7, authorization.length);
      const decode = jwt.verify(token, process.env.SECRETE);
      req.user = decode;
      next();
    } catch (err) {
      res.status(400).json({ error: "토큰이 만료되었습니다." });
    }
  } else {
    res.status(401).json({ message: "No Token" });
  }
};
