import { User } from "../../database/entities/User";

export const userResponse = (user: User) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    avatar: user.avatar ?? undefined,
    phoneNumber: user.phoneNumber ?? undefined,
    role: user.role,
    branch: user.branch
})