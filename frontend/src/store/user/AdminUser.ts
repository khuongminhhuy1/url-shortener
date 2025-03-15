import User from "./User";

export default class AdminUser extends User {
  constructor(userId: string, name: string, email: string) {
    super(userId, name, email, "ADMIN");
  }
  login() {
    console.log(`${this.name} is logging in as a regular user...`);
    console.log(`${this.name} is now logged in as ${this.role}`);
  }
}
