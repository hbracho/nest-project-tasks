import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { StatusTask } from "./task-status.enum";
import { TaskRepository } from "./task.repository";
import { TasksService } from "./tasks.service";

const mockTaskRepository= () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
});

const mockUser = {username : 'harold', id: 12};

describe ('TaskService', () =>{
    let taskService;
    let taskRepository;
    


    beforeEach (async () =>{
        const module = await Test.createTestingModule({
            providers:[
                TasksService, 
                {provide: TaskRepository, useFactory: mockTaskRepository}]
        }).compile();

        taskService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    })

    describe('getTasks',() => {

        it('get all tasks', async ()=>{

            taskRepository.getTasks.mockResolvedValue('tasks');
            
            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const filter :GetTaskFilterDto = { status: StatusTask.OPEN, search: 'some value'};
            const result = await taskService.getTasks(filter, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('tasks');
        })
    })

    describe ('getTaskById', () => {

        it('getTask by Id searche successfully', async ()=>{
            const mockTask = {title: 'test title', description: 'test description'};
            taskRepository.findOne.mockResolvedValue(mockTask);
            const result = await taskService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);

            expect(taskRepository.findOne).toHaveBeenCalledWith({where: {id: 1, userId: mockUser.id}})
        })

        it('throw a error when I do not found  the task by ID', ()=>{
            expect(taskRepository.findOne.mockResolvedValue(null)).rejects.toThrow(NotFoundException);
        })

    })

    describe('Create a task',  () =>{
        
        it('create a task', async()=>{
            const mockCreateTaskDTO = {title:'tttle mock', description:'description'};
            taskRepository.createTask.mockResolvedValue('someValue');
            //taskRepository.createTask.mockResolvedValue(mockCreateTaskDTO, mockUser);
            const result = await taskService.createTask(mockCreateTaskDTO, mockUser);
            expect(taskRepository.createTask).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
        
    })

    describe('deleteTask', () =>{

        it('delete tasks successfully', async ()=>{
            taskRepository.delete.mockResolvedValue({affected: 1});
            expect(taskRepository.delete).not.toHaveBeenCalled();
            const result = await taskService.deleteTask(1, mockUser);
            expect(taskRepository.delete).toHaveBeenCalledWith({id:1, userId: mockUser.id});
        })

        it('Not found Task when delete a task', ()=>{
            taskRepository.delete.mockResolvedValue({affected: 0});
            expect(taskService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
        })
    })

    describe('update Task', ()=>{

        it('update a task successfully', async ()=>{
            const mockTask = {title: 'test title', description: 'test description', status: StatusTask.OPEN};
            taskRepository.findOne.mockResolvedValue(mockTask);
            taskRepository.save.mockResolvedValue(mockTask);
            const result = await taskService.updateStatus(1, StatusTask.DONE, mockUser);            
            expect(taskRepository.save).toHaveBeenCalled();
            expect(taskRepository.findOne).toHaveBeenCalledWith({where: {id: 1, userId: mockUser.id}});
            console.log(result)
            expect(result.status).toEqual(StatusTask.DONE);
        })

        it('updates a task status', async () =>{
            
            const save = jest.fn().mockResolvedValue(true);
            const taskMock={title: 'testTitle', status: StatusTask.OPEN};
            taskService.getTaskById = jest.fn().mockResolvedValue(taskMock);
            taskRepository.save.mockResolvedValue(taskMock);

            expect(taskService.getTaskById).not.toHaveBeenCalled();
            expect(taskRepository.save).not.toHaveBeenCalled();
            const result = await taskService.updateStatus(1, StatusTask.DONE, mockUser);
            expect(taskService.getTaskById).toHaveBeenCalled();
            expect(taskRepository.save).toHaveBeenCalled();
            expect(result.status).toEqual(StatusTask.DONE);
        })

        it('throw an error, Not found Task', ()=>{
            taskRepository.findOne.mockResolvedValue(null);
            expect(taskService.updateStatus(1, StatusTask.DONE, mockUser)).rejects.toThrow(NotFoundException);
        })
    })
})