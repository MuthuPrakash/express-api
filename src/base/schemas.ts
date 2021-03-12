import joi from '@hapi/joi'
import { RequestSchema } from '../utility/interfaces'

const idLength = 24
const defaultLength = 255
const nameLength = {
    min: 2,
    max: 255
}

export const example: RequestSchema = {
    queryParams: joi.object().keys({
        limit: joi.number(),
        page: joi.number(),
        itemType: joi.string().valid(['batch', 'track', 'part'])
    }).allow(null).default({})
}
