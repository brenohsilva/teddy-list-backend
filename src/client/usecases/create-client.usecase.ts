import { Injectable } from '@nestjs/common';

import { Client } from '../entities/client.entity';
import { ClientService } from '../client.service';

@Injectable()
export class CreateClientUseCase {
  constructor(
    private readonly clientService: ClientService
  ) {}

  async execute(client: Client): Promise<Client> {
    try {
      return await this.clientService.create(client);
    } catch (error) {
      throw new Error(`Erro ao criar cliente: ${error.message}`);
    }
  }
}
