export default class UserEntity {
  constructor(
    public id: string,
    public name: string | null,
    public email: string,
    public password?: string // Optionnel, uniquement pour la création
  ) {}
}
