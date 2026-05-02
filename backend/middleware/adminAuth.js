import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
  
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access, token is missing" });
    }
    // Verify the token
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    
    //checking for is the decoded token maching with the admin email and password

   
    if (decoded_token.email !== process.env.ADMIN_EMAIL) {
     
      return res
        .status(403)
        .json({ message: "Forbidden access, you are not an admin" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export default adminAuth;
