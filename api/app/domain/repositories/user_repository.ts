export abstract class UserRepository {
  public abstract create(): Promise<string>
}
