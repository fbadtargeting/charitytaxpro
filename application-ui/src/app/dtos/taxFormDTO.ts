import { T1235DTO } from "./t1235DTO";
import { T1236DTO } from "./t1236DTO";
import { t3010DTO } from "./t3010DTO";

export class TaxFormDTO{
    t3010Dto:t3010DTO;
    t1235Dto:T1235DTO;
    t1236Dto:T1236DTO;
    user_id:number
    saveAndGeneratePdf:boolean = false
}