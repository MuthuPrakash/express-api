import crypto from 'crypto'
import joi from '@hapi/joi'

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
    return {
        statusCode,
        body: errorBody(err)
    }
}

export const errorResponseCustomMessage = (statusCode: number, errName: string, errMessage: string): ErrorResponse => {
    return {
        statusCode,
        body: {
            name: errName,
            message: errMessage
        }
    }
}
