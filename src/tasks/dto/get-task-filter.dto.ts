import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { StatusTask } from "../task-status.enum";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([StatusTask.DONE, StatusTask.IN_PROGRESS, StatusTask.OPEN])
    status : StatusTask;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}