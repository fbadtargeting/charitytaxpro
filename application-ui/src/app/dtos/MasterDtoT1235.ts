import { T1235DTO } from "./t1235DTO"
import { UserAcceptDto } from "./UserAcceptDto"

export class MasterDtoT1235{
    userId:number
    userAccept = new UserAcceptDto()
    t1235 = new T1235DTO()
}