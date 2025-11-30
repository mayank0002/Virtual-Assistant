import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  console.log("---- DEBUG AUTH ----");
  console.log("1. Cookies (Unsigned):", req.cookies); 
  console.log("2. Signed Cookies:", req.signedCookies);
  console.log("3. Secret check:", process.env.JWT_SECRET ? "Secret Exists" : "No Secret");
  try {
    const token = req.signedCookies.token;
    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "is Auth error" });
  }
};

export default isAuth;



