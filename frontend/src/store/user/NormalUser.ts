import User from "./User";

export default class NormalUser extends User {
  constructor(id: string, name: string, email: string) {
    super(id, name, email, "USER");
  }
  login() {
    console.log(`${this.name} is logging in as a regular user...`);
    
    console.log(`${this.name} is now logged in as ${this.role}`);
  }
}
