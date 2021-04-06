import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { StatusTask, Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor (private taskService: TasksService){
    }

    @Get()
    getTasks(@Query(ValidationPipe) taskfilterDto: GetTaskFilterDto):Task[]{
        
        
        if(Object.keys(taskfilterDto).length){
            return this.taskService.getTasksWithFilters( taskfilterDto);
        }else {

            return this.taskService.getAllTasks();
        }

    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task {
        return this.taskService.getTaskById(id);
    }
    @Delete(':id')
    deleteTask(@Param('id') id: string):void {
        return this.taskService.deleteTask(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO:CreateTaskDTO): Task{

            return this.taskService.crateTask(createTaskDTO);
    }

    @Patch(':id/status')
    changeStatusTask(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: StatusTask): Task {

        return this.taskService.changeStatusTask(id, status);
    }

}
