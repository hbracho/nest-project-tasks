import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor (private taskService: TasksService){
    }

    @Get()
    getAllTasks():Task[]{
        console.log('Entroooo')
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDTO:CreateTaskDTO): Task{

            return this.taskService.crateTask(createTaskDTO);
    }

}
