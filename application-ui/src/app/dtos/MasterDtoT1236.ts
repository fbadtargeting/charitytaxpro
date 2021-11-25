import { T1236DTO } from "./t1236DTO"
import { UserAcceptDto } from "./UserAcceptDto"

export class MasterDtoT1236{
    userId:number
    userAccept = new UserAcceptDto()
    t1236 = new T1236DTO()
}