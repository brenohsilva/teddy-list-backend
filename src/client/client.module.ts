import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { FindAllClientsUseCase } from './usecases/find-all-clients.usecase';
import { FindClientUseCase } from './usecases/find-client.usecase';
import { CreateClientUseCase } from './usecases/create-client.usecase';
import { UpdateClientUseCase } from './usecases/update-client.usecase';
import { DeleteClientUseCase } from './usecases/delete-client.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    ClientService,
    FindAllClientsUseCase,
    FindClientUseCase,
    CreateClientUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
  ],
})
export class ClientModule {}
