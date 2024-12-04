/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Client } from 'src/entities/client.entity';
import { DeleteClientUseCase } from '../delete-client.usecase';
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
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('DeleteClientUseCase', () => {
  let useCase: DeleteClientUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClientUseCase,
        {
          provide: ClientService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    useCase = module.get<DeleteClientUseCase>(DeleteClientUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a client successfully', async () => {
    const result = await useCase.execute(1);

    expect(mockClientService.findOne).toHaveBeenCalledWith(1);
    expect(mockClientService.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ message: `Cliente com ID 1 foi removido com sucesso.` });
  });

  it('should throw NotFoundException if client does not exist', async () => {
    const clientId = 999;
  
    (mockClientService.findOne as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute(clientId)).rejects.toThrowError(
      `Cliente com ID ${clientId} não encontrado.`
    );
  
  
    expect(mockClientService.findOne).toHaveBeenCalledWith(clientId);
  
   
    expect(mockClientService.remove).not.toHaveBeenCalled();
  });
  
  
});
