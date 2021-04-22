import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { StatusTask } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filter: GetTaskFilterDto, user: User): Promise <Task[]> {
        const {status, search} = filter;
        const query = this.createQueryBuilder('task');
        query.andWhere('task.userId = :userId', {userId : user.id})
        if(status){
            query.andWhere('task.status = :status', {status});
        }
       
        if (search){
            console.log('search', search);
            query.andWhere('(task.description LIKE :search OR task.title LIKE :search)', {search: `%${search}%`});
        }
        const tasks = await query.getMany();


        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task>{
    
        const {title, description}= createTaskDto;
        const task = new Task();
        task.description = description;
        task.title = title;
        task.status = StatusTask.OPEN;
        task.user= user;
        await this.save(task);
        delete task.user;
        return task; 
    }

}