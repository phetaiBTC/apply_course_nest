

export interface AuthRepository {
    verifyEmail(id: number): Promise<void>;
}
