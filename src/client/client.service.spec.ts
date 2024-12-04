/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockClient = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  salary: '5000',
  companyValue: '10000',
};

const mockClientRepository = {
  find: jest.fn().mockResolvedValue([mockClient]),
  findOneBy: jest.fn().mockResolvedValue(mockClient),
  save: jest.fn().mockResolvedValue(mockClient),
  update: jest.fn().mockResolvedValue(mockClient),
  delete: jest.fn().mockResolvedValue(true),
};

describe('ClientService', () => {
  let service: ClientService;
  let repository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return all clients', async () => {
    const clients = await service.findAll();
    expect(clients).toEqual([mockClient]);
    expect(repository.find).toHaveBeenCalledTimes(1);
  });

  it('should return one client by ID', async () => {
    const client = await service.findOne(1);
    expect(client).toEqual(mockClient);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a client', async () => {
    const client = await service.create(mockClient);
    expect(client).toEqual(mockClient);
    expect(repository.save).toHaveBeenCalledWith(mockClient);
  });

  it('should update a client', async () => {
    const updatedClient = { ...mockClient, firstName: 'Jane' };
    repository.update = jest.fn().mockResolvedValue(updatedClient);

    const client = await service.update(1, updatedClient);
    expect(client).toEqual(mockClient);
    expect(repository.update).toHaveBeenCalledWith(1, updatedClient);
  });

  it('should remove a client', async () => {
    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
