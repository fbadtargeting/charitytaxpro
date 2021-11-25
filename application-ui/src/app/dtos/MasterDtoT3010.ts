import { t3010DTO } from "./t3010DTO"
import { UserAcceptDto } from "./UserAcceptDto"

export class MasterDtoT3010{
    userId:number
    userAccept = new UserAcceptDto()
    t3010 = new t3010DTO()
}