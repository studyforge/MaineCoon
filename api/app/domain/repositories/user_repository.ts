export abstract class UserRepository {
  public abstract create(): Promise<string>
  public abstract findByEmail(email: string): Promise<User | null>
}
