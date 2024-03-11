import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/CreateTask.dto';
import { CreateTaskParams } from 'src/graphql/utils/types';
import { TasksService } from 'src/tasks/TaskService';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    this.tasksService.createTask(createTaskDto);
  }
  @Get()
  async getTasks() {
    const tasks = await this.tasksService.getTasks();
    return tasks;
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') id: number) {
    const deleted = await this.tasksService.deleteTask(id);
    return deleted;
  }
}
