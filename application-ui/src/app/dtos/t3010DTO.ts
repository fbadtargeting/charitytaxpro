import { T3010SecA } from "./t3010SecA";
import { T3010SecC } from "./t3010SecC";
import { T3010SecD } from "./t3010SecD";
import { T3010SecE } from "./t3010SecE";
import { T3010SecF } from "./t3010SecF";

export class t3010DTO {
    t3010SecA:T3010SecA
    t3010SecC:T3010SecC
    t3010SecD:T3010SecD
    t3010SecE:T3010SecE
    t3010SecF:T3010SecF
    user_id:number
    saveAndGeneratePdf:boolean = false
}