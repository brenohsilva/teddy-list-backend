import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { FindAllClientsUseCase } from './usecases/find-all-clients.usecase';
import { FindClientUseCase } from './usecases/find-client.usecase';
import { CreateClientUseCase } from './usecases/create-client.usecase';
import { UpdateClientUseCase } from './usecases/update-client.usecase';
import { DeleteClientUseCase } from './usecases/delete-client.usecase';

@Controller('Clients')
export class ClientController {
  constructor(
    private readonly ClientService: ClientService,
    private readonly findAllClients: FindAllClientsUseCase,
    private readonly findOneClient: FindClientUseCase,
    private readonly createClient: CreateClientUseCase,
    private readonly updateClient: UpdateClientUseCase,
    private readonly deleteClient: DeleteClientUseCase,
  ) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.findAllClients.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Client> {
    return this.findOneClient.execute(id);
  }

  @Post()
  create(@Body() Client: Client): Promise<Client> {
    return this.createClient.execute(Client);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() Client: Partial<Client>,
  ): Promise<Client> {
    return this.updateClient.execute(id, Client);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.deleteClient.execute(id);
  }
}
