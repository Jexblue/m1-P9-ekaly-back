import {IsDateString, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {UserEntity} from "../entity/user.entity";
import {generateObjectID, isEmpty} from "../services/utils.service";
import {ObjectID} from "typeorm";
import {I_BaseDto} from "./base.dto";


export class UserDto implements I_BaseDto {

    get id(): ObjectID {

        return generateObjectID(this._id);

    }


    get first_name(): string {

        return this._first_name.trim();

    }


    get last_name(): string {

        return this._last_name.trim();

    }


    get birthday(): Date {

        return new Date(this._birthday);

    }


    @IsOptional()
    @IsString() private _id?: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 40) private _first_name: string;

    @IsString()
    @IsNotEmpty() private _last_name: string;

    @IsDateString()
    @IsNotEmpty() private _birthday: string;


    public async getEntityFromSelf(): Promise<UserEntity> {

        const user: UserEntity = new UserEntity();

        if (isEmpty(this._id)) user._id = this.id;

        user.firstName = this.first_name;
        user.lastName = this.last_name;
        user.birthday = this.birthday;

        console.log(user);

        return user;

    }

}
