import {ObjectID} from "typeorm";
import {I_ResponseEntity} from "../models/response-entity";


const equal = require('deep-equal');

export const isEqual = (value1: any, value2: any): boolean => {

    return equal(value1, value2);

}


export const getResponseEntity = (error: boolean, status: boolean | number, message: string, data?: any): I_ResponseEntity => {

    if (error)
        return {status: status, message: message};
    else
        return {data: data, status, message: message};

}


export const isEmpty = (value: any): boolean => {

    if (value === undefined || value === null || value === '') {

        return true;

    }

    if (typeof (value) == 'function' || typeof (value) == 'number' || typeof (value) == 'boolean' || Object.prototype.toString.call(value) === '[object Date]') {

        return false;

    }

    if (typeof (value) == "object") {

        let result = true;

        for (const field in value) {

            result = false;

        }

        return result;

    }

    return value.length === 0 || !value.length;



}


export const generateObjectID = (ID?: string): ObjectID => {

    const ObjectID = require('mongodb').ObjectID;

    return new ObjectID(ID);

}
