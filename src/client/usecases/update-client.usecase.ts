import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { ClientService } from '../client.service';

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(id: number, data: Partial<Client>): Promise<Client> {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    await this.clientService.update(id, data);
    return this.clientService.findOne(id); 
  }
}
