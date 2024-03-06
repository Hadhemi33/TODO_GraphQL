import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/models/Task';
import { CreateTaskParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  createTask(taskDetails: CreateTaskParams) {
    const newTask = this.taskRepository.create({ ...taskDetails });
    return this.taskRepository.save(newTask);
  }
  getTasks() {
    return this.taskRepository.find();
  }
  deleteTask(id: number) {
    return this.taskRepository.delete({ id });
  }
}
