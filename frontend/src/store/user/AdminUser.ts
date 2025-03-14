import User from "./User";

export default class AdminUser extends User {
  constructor(id: string, name: string, email: string) {
    super(id, name, email, "ADMIN");
  }
  login() {
    console.log(`${this.name} is logging in as a regular user...`);
    console.log(`${this.name} is now logged in as ${this.role}`);
  }
}
