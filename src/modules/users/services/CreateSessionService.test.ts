import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import MockUserRepository from '../typeorm/repositories/mock/MockUserRepository';
import mockprovider from '../providers/HashProvider/mocks/MockHashProvider';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../typeorm/repositories/IUserRepository';
import CreateSessionService from './CreateSessionService';
import User from '../typeorm/entities/users';

let mockUsersRepository: IUserRepository;
let createSessioSevice: CreateSessionService;
let mockHashProvider: IHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUserRepository();
    mockHashProvider = mockprovider;
    createSessioSevice = new CreateSessionService(mockUsersRepository, mockHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await mockUsersRepository.save(new User(
      'teste teste',
      'teste@teste.com',
      '123456',
    ));

    const response = await createSessioSevice.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);  });

    it('should not be able to authenticate with non existent user', async () => {
      expect(
        createSessioSevice.execute({
          email: 'teste@teste.com',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
      const user = await mockUsersRepository.save(new User(
        'teste teste',
        'teste@teste.com',
        '123456',
      ));
  
      expect(
        createSessioSevice.execute({
          email: 'teste@teste.com',
          password: '567890',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  
});