/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateClientUseCase } from '../update-client.usecase';
import { ClientService } from '../../client.service';

describe('UpdateClientUseCase', () => {
  let useCase: UpdateClientUseCase;
  let mockClientService: Partial<ClientService>;

  beforeEach(async () => {
    mockClientService = {
      findOne: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateClientUseCase,
        { provide: ClientService, useValue: mockClientService },
      ],
    }).compile();

    useCase = module.get<UpdateClientUseCase>(UpdateClientUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a client successfully', async () => {
    const mockClient = { id: 1, firstName: 'John', salary: '5000', companyValue: '10000' };
    const updateData = { firstName: 'Jane', salary: '6000' };
    const updatedClient = { ...mockClient, ...updateData }; 
  
   
    (mockClientService.findOne as jest.Mock)
      .mockResolvedValueOnce(mockClient) 
      .mockResolvedValueOnce(updatedClient); 
  
    
    (mockClientService.update as jest.Mock).mockResolvedValue(updatedClient);
  
    const result = await useCase.execute(1, updateData);
  
    expect(mockClientService.findOne).toHaveBeenCalledWith(1);
    expect(mockClientService.update).toHaveBeenCalledWith(1, updateData);
    expect(result).toEqual(updatedClient); 
  });
  

  it('should throw NotFoundException if client is not found', async () => {
    (mockClientService.findOne as jest.Mock).mockResolvedValue(null);

    const updateData = { firstName: 'Jane', salary: '6000' };

    await expect(useCase.execute(999, updateData)).rejects.toThrow(
      new NotFoundException(`Cliente com ID 999 não encontrado.`),
    );

    expect(mockClientService.findOne).toHaveBeenCalledWith(999);
    expect(mockClientService.update).not.toHaveBeenCalled(); 
  });
});
