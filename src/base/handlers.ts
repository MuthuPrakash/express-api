import { RequestHandler } from 'express'
import logger from '../utility/logger'
// import { errorResponse } from './../error_handler/error-handler'
import * as nspErrorHandler from 'nsp-error-handler'

export const ping: RequestHandler = async (req, res, next) => {

    res.json('pong')
}
