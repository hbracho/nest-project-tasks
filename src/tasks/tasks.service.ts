import { Injectable } from '@nestjs/common';
import { StatusTask, Task } from './tasks.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {

    private tasks:Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    crateTask(createTaskDto: CreateTaskDTO): Task{
        const {title, description}= createTaskDto;
        const task: Task={
            id: uuid(),
            title,
            description,
            status: StatusTask.OPEN,

        }
        this.tasks.push(task);
        return task;
    }
}
