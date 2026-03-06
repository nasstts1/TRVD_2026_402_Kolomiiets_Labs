export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface AuthResponseDTO {
  user: UserDTO;
  token: string;
}

export const toUserDTO = (user: any): UserDTO => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});