import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientService } from '../client.service';

@Injectable()
export class DeleteClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(id: number): Promise<{ message: string }> {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    await this.clientService.remove(id);
    return { message: `Cliente com ID ${id} foi removido com sucesso.` };
  }
}
