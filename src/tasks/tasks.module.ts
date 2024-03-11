import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TasksService } from './TaskService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/graphql/models/Task';
import { TaskResolver } from './TaskResolver';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TaskResolver],
})
export class TasksModule {}
