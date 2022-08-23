import { v4 as uuidv4 } from 'uuid';
import User from '../../entities/users';
import IUserRepository from '../IUserRepository';


class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async save(user: User): Promise<void> {
    if(!user.id) {
        user.id = uuidv4();
        this.users.push(user);
    }
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

  }

  public async remove(user: User): Promise<void> {}

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name);
    if (user === undefined) return null

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    if (user === undefined) return null

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    if (user === undefined) return null

    return user;
  }
}

export default FakeUsersRepository;