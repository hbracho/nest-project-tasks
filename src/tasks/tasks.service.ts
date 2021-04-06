import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusTask, Task } from './tasks.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    
    private tasks:Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    getTasksWithFilters(taskfilterDto: GetTaskFilterDto): Task[] {
        
        const {status, search} = taskfilterDto;
        let tasks = this.getAllTasks();
        if (status){
            tasks = this.tasks.filter(task => task.status === status);
        }

        if (search){
            tasks = this.tasks.filter(task => task.description.includes(search) || task.title.includes(search));
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        const result =  this.tasks.find(task => task.id === id);
        if(!result){
            throw new NotFoundException(`Task Id ${id} not found`);
        }
        return result;
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

    deleteTask(id:string):void {
        
        //this.tasks.find(task => task.id === id);
       /**this.tasks.forEach((value, index)=> {
            if (value.id === id){
                this.tasks.splice(index, 1);
                console.log('deleted :-D')
            }else {
                console.log ('element not found :_(')
            }
        })*/
        const found = this.getTaskById(id);

        this.tasks = this.tasks.filter( task => task.id !== found.id);
    }

    changeStatusTask( id : string, newStatus: StatusTask ): Task {
        
        const task = this.getTaskById(id);
        task.status = newStatus;

        return task;
    }
}
