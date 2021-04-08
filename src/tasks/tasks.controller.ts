import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { StatusTask } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {

    private logger = new Logger(TasksController.name);

    constructor (private taskService: TasksService){
    }

    @Get()
    getTasks(@Query(ValidationPipe) taskfilterDto: GetTaskFilterDto):Promise <Task[]>{
        
        this.logger.debug(`Server is up and running HAROLD`);
        this.logger.log({message: 'hello', attributes : { env: 'dev' }});

        return this.taskService.getTasks(taskfilterDto);

    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }
    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTask(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO:CreateTaskDTO): Promise <Task>{

        return this.taskService.createTask(createTaskDTO);
    }

    @Patch(':id/status')
    changeStatusTask(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: StatusTask): Promise<Task> {

        return this.taskService.updateStatus(id, status);
    }

}
