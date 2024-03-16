import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { Task } from 'src/graphql/models/Task';
import { UpdateTaskInput } from 'src/graphql/utils/CreateTaskInput';
import { CreateTaskParams, UpdateTaskParams } from 'src/graphql/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  createTask(taskDetails: UpdateTaskInput) {
    const newTask = this.taskRepository.create({ ...taskDetails });
    return this.taskRepository.save(newTask);
  }
  getTasks() {
    return this.taskRepository.find();
  }
  // deleteTask(id: number) {
  //   return this.taskRepository.delete({ id });
  // }
  async deleteTask(id: number): Promise<string> {
    // Fetch the task before deletion
    const taskToDelete = await this.taskRepository.findBy({ id });

    if (!taskToDelete) {
      throw new Error(`Task with id ${id} not found`);
    }

    // const deletedTask = await this.taskRepository.remove(taskToDelete);

    // return deletedTask;
    try {
      await this.taskRepository.remove(taskToDelete);
      return `Task with id ${id} deleted successfully`;
    } catch (error) {
      throw new Error(`Error deleting task with id ${id}: ${error.message}`);
    }
  }
  async updateTask(id: number, taskDetails: UpdateTaskInput) {
    const taskToUpdate = await this.taskRepository.findBy({ id });
    console.log(taskToUpdate, 'taskToUpdate');
    if (!taskToUpdate) {
      throw new Error(`Task with id ${id} not found`);
    }
    const updatedTask = await this.taskRepository.save({
      ...taskDetails,
      id,
    });
    return updatedTask;
  }
}
