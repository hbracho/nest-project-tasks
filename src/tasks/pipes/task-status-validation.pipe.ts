import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import {StatusTask} from "../task-status.enum"
export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatuses = [
        StatusTask.DONE,
        StatusTask.IN_PROGRESS,
        StatusTask.OPEN,
    ]
    transform (value: any){
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status:any):boolean {
        const idx =  this.allowedStatuses.indexOf(status);

        return idx !== -1;
    }

}