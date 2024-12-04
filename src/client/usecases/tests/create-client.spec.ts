/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUseCase } from '../create-client.usecase';
import { Client } from 'src/entities/client.entity';
import { ClientService } from '../../client.service';


const mockClient = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  salary: '5000',
  companyValue: '10000',
} as Client;

const mockClientService = {
  create: jest.fn().mockResolvedValue(mockClient),
};

describe('CreateClientUseCase', () => {
  let useCase: CreateClientUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUseCase,
        {
          provide: ClientService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    useCase = module.get<CreateClientUseCase>(CreateClientUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a client and return it', async () => {
    const client = await useCase.execute(mockClient);
    expect(client).toEqual(mockClient);
    expect(mockClientService.create).toHaveBeenCalledWith(mockClient);
  });

  it('should throw an error if client creation fails', async () => {
    mockClientService.create = jest.fn().mockRejectedValue(new Error('Database error'));

    await expect(useCase.execute(mockClient)).rejects.toThrow(
      new Error('Erro ao criar cliente: Database error'),
    );
    expect(mockClientService.create).toHaveBeenCalledWith(mockClient);
  });
});
