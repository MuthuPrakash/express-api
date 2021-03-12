import crypto from 'crypto'
import mappings from './error-code-mappings.json';
import { stat } from 'fs';

export interface ErrorDetail {
    field: string,
    value: any,
    issue: string,
    location: string
}

export interface Error {
    name: string,
    details?: ErrorDetail[],
    debugId?: string,
    message: string,
    informationLink?: string
}

export interface ErrorResponse {
    statusCode: number,
    errorCode: string,
    body: Error
}

export const errorBody = (err: Error) => {
    // Don't want accidental side effects.
    const errCopy = { ...err }
    if (!errCopy.debugId) {
        errCopy.debugId = crypto.randomBytes(16).toString('hex')
    }
    return errCopy
}

export const errorResponse = (statusCode: number, err: Error): ErrorResponse => {

    const errorStatusCode = (<any>mappings)[statusCode] || 500;

    const errorHandler = {
        statusCode,
        errorCode: (<any>mappings)[statusCode],
        body: errorBody(err)
    }
    console.log(errorHandler);
    return errorHandler
}

export const errorResponseCustomMessage = (statusCode: number, errName: string, errMessage: string): ErrorResponse => {
    const errorStatusCode = (<any>mappings)[statusCode] || 500;

    const errorHandler = {
        statusCode,
        errorCode: (<any>mappings)[statusCode],
        body: {
            name: errName,
            message: errMessage
        }
    }
    console.log(errorHandler);
    return errorHandler

}
