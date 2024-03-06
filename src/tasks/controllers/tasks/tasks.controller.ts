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
import { TasksService } from 'src/tasks/services/tasks/tasks.service';
import { CreateTaskParams } from 'src/utils/types';

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
  async deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.tasksService.deleteTask(id);
    return deleted;
  }
}
