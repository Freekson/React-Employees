const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/user/login
 * @description Login
 * @access Public
 */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const secret = process.env.JWT_SECRET;

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1h" }),
      });
    } else {
      return res.status(400).json({ message: "Incorrect login or password" });
    }
  } catch (err) {
    res.status(500).json("Failed to login");
    console.log(err);
  }
};

/**
 * @route POST /api/user/register
 * @description Registration
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { email, name, password, password_confirm } = req.body;

    if (!email || !name || !password || !password_confirm) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }

    if (password !== password_confirm) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return res
        .status(400)
        .json({ message: "User with this e-mail already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "15m" }),
      });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (err) {
    res.status(500).json("Failed to register");
    console.log(err);
  }
};

/**
 * @route GET /api/user/current
 * @description Current user
 * @access Private
 */

const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
