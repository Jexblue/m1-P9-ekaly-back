import {BaseModel} from "../entity/base-model";


export interface I_BaseDto {

    getEntityFromSelf(params?: any): Promise<BaseModel>;

}
