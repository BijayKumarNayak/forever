import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  // console.log("Auth user token", token);
  if (!token) {
    // console.log("token is not available")
    return res
      .status(401)
      .json({ message: "Unauthorized access, token is missing" });
  }
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded_token)
    req.body.userId = decoded_token.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "authentication failed", success: false });
  }
};

export default authUser;
