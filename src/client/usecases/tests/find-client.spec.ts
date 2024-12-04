/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { Client } from 'src/entities/client.entity';
import { FindClientUseCase } from '../find-client.usecase';
import { ClientService } from '../../client.service';


const mockClient = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  salary: '5000',
  companyValue: '10000',
} as Client;

const mockClientService = {
  findOne: jest.fn((id: number) => {
    if (id === 1) {
      return Promise.resolve(mockClient);
    }
    return Promise.resolve(null);
  }),
};

describe('FindClientUseCase', () => {
  let useCase: FindClientUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindClientUseCase,
        {
          provide: ClientService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    useCase = module.get<FindClientUseCase>(FindClientUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a client when a valid ID is provided', async () => {
    const client = await useCase.execute(1);
    expect(client).toEqual(mockClient);
    expect(mockClientService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when client is not found', async () => {
    await expect(useCase.execute(999)).rejects.toThrow(
      new NotFoundException(`Cliente com ID 999 não encontrado.`),
    );
    expect(mockClientService.findOne).toHaveBeenCalledWith(999);
  });
});
