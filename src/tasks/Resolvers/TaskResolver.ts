import { Query, Resolver } from '@nestjs/graphql';
import { Task } from 'src/models/Task';

@Resolver()
export class TaskResolver {
  @Query((returns) => Task)
  getTasks() {
    return {
      id: 1,
      desc: 'anson',
      checked: true,
    };
  }
}
