import { IResponseType } from "./api-models/IResponseType";


export const formatResponse = async (status: number, message?: string, data?: any): Promise<IResponseType> => {

    const response: IResponseType = { message: isEmpty(message) ? 'Data found' : message!, status: status };

    if (!isEmpty(data)) Object.assign(response, { data: data! });

    return response;

};


export const isEmpty = (value: any): boolean => {

    return (
        value === null || // check for null
        value === undefined || // check for undefined
        value === '' || // check for empty string
        (Array.isArray(value) && value.length === 0) || // check for empty array
        (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
    );

}