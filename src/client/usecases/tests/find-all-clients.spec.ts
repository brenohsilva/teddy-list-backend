/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllClientsUseCase } from '../find-all-clients.usecase';
import { ClientService } from '../../client.service';


const mockClient = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  salary: '5000',
  companyValue: '10000',
};

const mockClientService = {
  findAll: jest.fn().mockResolvedValue([mockClient]),
};

describe('FindAllClientsUseCase', () => {
  let useCase: FindAllClientsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllClientsUseCase,
        {
          provide: ClientService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    useCase = module.get<FindAllClientsUseCase>(FindAllClientsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all clients', async () => {
    const clients = await useCase.execute();
    expect(clients).toEqual([mockClient]);
    expect(mockClientService.findAll).toHaveBeenCalledTimes(1);
  });
});
