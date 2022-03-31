import {Column, ObjectID, ObjectIdColumn} from "typeorm";
import {generateObjectID} from "../services/utils.service";


export abstract class BaseModel {

    @ObjectIdColumn({
        nullable: false
    })
    _id: ObjectID;

    @Column({
        type: 'timestamp',
        default: () => new Date(),
        nullable: false
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => new Date(),
        nullable: false
    })
    lastUpdate: Date;

    @Column({
        default: false,
        nullable: false
    })
    deleted: boolean;
    /*bhb*/

}
