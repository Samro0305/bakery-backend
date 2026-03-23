import prisma from "../config/prisma.js";

// REGISTER
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await prisma.user.findUnique({
      where: { username }
    });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await prisma.user.create({
      data: { username, password }
    });

    res.json({ message: "User created", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ username: user.username });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET USERS (ADMIN)
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true }
    });

    res.json(users);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};