import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/graphql/models/Task';
import { CreateTaskParams } from 'src/graphql/utils/types';
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
  // deleteTask(id: number) {
  //   return this.taskRepository.delete({ id });
  // }
  async deleteTask(id: number): Promise<string> {
    // Fetch the task before deletion
    const taskToDelete = await this.taskRepository.findBy({ id });

    if (!taskToDelete) {
      throw new Error(`Task with id ${id} not found`);
    }

    // // Delete the task
    // const deletedTask = await this.taskRepository.remove(taskToDelete);

    // // Return the deleted task
    // return deletedTask;
    try {
      // Delete the task
      await this.taskRepository.remove(taskToDelete);
      return `Task with id ${id} deleted successfully`;
    } catch (error) {
      throw new Error(`Error deleting task with id ${id}: ${error.message}`);
    }
  }
}
