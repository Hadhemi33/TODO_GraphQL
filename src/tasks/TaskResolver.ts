import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from 'src/graphql/models/Task';
import { TasksService } from './TaskService';
import { CreateTaskParams } from 'src/graphql/utils/types';
import {
  CreateTaskInput,
  UpdateTaskInput,
} from 'src/graphql/utils/CreateTaskInput';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class TaskResolver {
  constructor(private tasksService: TasksService) {}
  @Query((returns) => [Task])
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Mutation((returns) => Task)
  createTask(@Args('createUserData') createTaskData: CreateTaskInput) {
    return this.tasksService.createTask(createTaskData);
  }
  @Mutation((returns) => String)
  deleteTask(@Args('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
  @Mutation((returns) => Task)
  async updateTask(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateUserData') updateTaskData: UpdateTaskInput,
  ) {
    return this.tasksService.updateTask(id, updateTaskData);
  }
}
