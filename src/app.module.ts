import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models/Task';
import { TasksModule } from './tasks/tasks.module';
import { TaskResolver } from './tasks/Resolvers/TaskResolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'task',
      entities: [Task],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql', // Permet à Apollo de générer automatiquement le schéma GraphQL
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskResolver],
})
export class AppModule {}
