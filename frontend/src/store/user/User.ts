export default class User {
  protected userId: string;
  public name: string;
  public email: string;
  protected role: string;
  constructor(userId: string, name: string, email: string, role: string) {
    if (new.target === User) {
      throw new Error("Cannot instantiate an abstract class directly");
    }

    this.userId = userId;
    this.name = name;
    this.email = email;
    this.role = role;
  }
  login() {
    throw new Error('Method "login" must be implemented');
  }
  logout() {
    console.log(`${this.name} logged out`);
  }
}
