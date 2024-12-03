import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';


@Controller('Clients')
export class ClientController {
  constructor(private readonly ClientService: ClientService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.ClientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Client> {
    return this.ClientService.findOne(id);
  }

  @Post()
  create(@Body() Client: Client): Promise<Client> {
    return this.ClientService.create(Client);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() Client: Partial<Client>): Promise<Client> {
    return this.ClientService.update(id, Client);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ClientService.remove(id);
  }
}
