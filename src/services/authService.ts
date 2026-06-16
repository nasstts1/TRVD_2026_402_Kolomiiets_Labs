import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository";
import { Role } from "@prisma/client";
import { toUserDTO, AuthResponseDTO } from "../dto/userDto";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export class AuthService {
  constructor(private repo = userRepository) {}

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: Role;
  }): Promise<AuthResponseDTO> {
    const existingUser = await this.repo.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Користувач з таким email вже існує");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.repo.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      role: data.role,
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { user: toUserDTO(user), token };
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<AuthResponseDTO> {
    const user = await this.repo.getUserByEmail(data.email);
    if (!user) {
      throw new Error("Невірний email або пароль");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Невірний email або пароль");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "60m" }
    );

    return { user: toUserDTO(user), token };
  }
}

export const authService = new AuthService();