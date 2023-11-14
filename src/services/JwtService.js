const jwt = require("jsonwebtoken");

const SECRET = "f3625dde02dc8b71899a525940761446d9eb7ade";
const createToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
};

const verifyToken = (token) => {
  console.log(token);
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw { ok: false, info: error };
  }
};

module.exports = { createToken, verifyToken };