import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import MockUserRepository from '../typeorm/repositories/mock/MockUserRepository';
import mockprovider from '../providers/HashProvider/mocks/MockHashProvider';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../typeorm/repositories/IUserRepository';

let fakeUsersRepository: IUserRepository;
let createUser: CreateUserService;
let fakeHashProvider: IHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new MockUserRepository();
    fakeHashProvider = mockprovider;
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'teste teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'teste teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'teste teste',
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});