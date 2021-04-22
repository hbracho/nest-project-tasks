import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { StatusTask } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    private logger = new Logger(TasksController.name);

    constructor (private taskService: TasksService){
    }

    @Get()
    getTasks(@Query(ValidationPipe) taskfilterDto: GetTaskFilterDto, @GetUser() user:User):Promise <Task[]>{
        try{
            this.logger.debug('test de harod bracho','asdasd');
            this.logger.log({message: 'request to get all task on the system',  contextMap : { env_custom: 'dev' }});
            
            return this.taskService.getTasks(taskfilterDto, user);
        }catch(e){
            this.logger.error('harold errror')
            this.logger.error({message: 'menssage',trace: 'asdasdasd'});
        }

    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number, @GetUser() user: User): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }
    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        return this.taskService.deleteTask(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO:CreateTaskDTO, @GetUser() user: User): Promise <Task>{

        return this.taskService.createTask(createTaskDTO, user);
    }

    @Patch(':id/status')
    changeStatusTask(@Param('id', ParseIntPipe) id: number, 
    @Body('status', TaskStatusValidationPipe) status: StatusTask,
    @GetUser() user: User): Promise<Task> {

        return this.taskService.updateStatus(id, status, user);
    }

}
