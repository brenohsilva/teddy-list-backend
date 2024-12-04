import { Injectable } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { ClientService } from '../client.service';

@Injectable()
export class FindAllClientsUseCase {
  constructor(
     private readonly clientService: ClientService
  ) {}

  async execute(): Promise<Client[]> {
    try {
      return await this.clientService.findAll();
    } catch (error) {
      throw new Error(`Erro ao buscar clientes: ${error.message}`);
    }
  }
}
