import { Request } from 'express'
import joi from '@hapi/joi'

export interface TypedRequest<T> extends Request {
    body: T
}

export interface RequestSchema {
    headers?: joi.SchemaLike,
    params?: joi.SchemaLike,
    queryParams?: joi.SchemaLike,
    body?: joi.SchemaLike
}
