import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'eslint/lib/rules/*';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { StatusTask } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {


    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository) {

    }

    getTasks(filterDTO: GetTaskFilterDto, user:User): Promise<Task[]>{
        // if(filterDTO.status ==='OPEN'){
        //     throw new Error('asdasdasd');
        // }
        return this.taskRepository.getTasks(filterDTO,user);
    }

    // getTasksWithFilters(taskfilterDto: GetTaskFilterDto): Task[] {

    //     const {status, search} = taskfilterDto;
    //     let tasks = this.getAllTasks();
    //     if (status){
    //         tasks = this.tasks.filter(task => task.status === status);
    //     }

    //     if (search){
    //         tasks = this.tasks.filter(task => task.description.includes(search) || task.title.includes(search));
    //     }

    //     return tasks;
    // }
    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({where: {id, userId: user.id}});

        if (!found) {
            throw new NotFoundException(`Task Id ${id} not found`);
        }
        return found;

    }

    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task>{
    
        return this.taskRepository.createTask(createTaskDto, user);
    }
    async deleteTask(id:number, user:User) {
        
        // const found =  await this.getTaskById(id);
        // const obejectDeleted = await this.taskRepository.remove(found);
        
        // if(!obejectDeleted){
        //     throw new NotFoundException(`${id} not found`);
        // }
        const result = await this.taskRepository.delete({id, userId: user.id});
        if(result.affected === 0){
            throw new NotFoundException(`${id} not found`);
        }
    }
    
    async updateStatus(id:number, 
        newStatus: StatusTask,
        user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);       
        task.status = newStatus;       
        return await this.taskRepository.save(task);
    }
}
