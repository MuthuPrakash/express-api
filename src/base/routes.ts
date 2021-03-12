import * as baseHandles from './handlers'
import express from 'express'

const baseRoutes = express.Router()

baseRoutes.get('/ping', baseHandles.ping)

export default baseRoutes
