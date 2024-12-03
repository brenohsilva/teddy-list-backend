import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private ClientRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.ClientRepository.find();
  }

  findOne(id: number): Promise<Client> {
    return this.ClientRepository.findOneBy({ id });
  }

  create(Client: Client): Promise<Client> {
    return this.ClientRepository.save(Client);
  }

  async update(id: number, Client: Partial<Client>): Promise<Client> {
    await this.ClientRepository.update(id, Client);
    return this.ClientRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.ClientRepository.delete(id);
  }
}
