import {Column, Entity} from "typeorm"
import {BaseModel} from "./base-model";


@Entity('user')
export class UserEntity extends BaseModel {

    @Column({
        nullable: false
    })
    firstName: string;

    @Column({
        nullable: false
    })
    lastName: string;

    @Column({
        type: 'date',
        nullable: false
    })
    birthday: Date;

}
