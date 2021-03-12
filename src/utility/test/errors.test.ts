import assert from 'assert'
import * as errors from '../errors'
import sinon from 'sinon'
import joi from '@hapi/joi'

describe('errorBody', () => {
    let err: errors.Error

    beforeEach(() => {
        err = {
            name: 'name',
            details: [
                {
                    field: 'abc',
                    value: 'value',
                    issue: 'bad value',
                    location: 'abc/123'
                }
            ],
            debugId: '',
            message: 'message',
            informationLink: 'link'
        }
    })

    it('should assign 16 random bytes to the "debugId" property if it doesnt yet exist', () => {
        const actual = errors.errorBody(err)
        assert.deepEqual(typeof actual.debugId, 'string')
        assert.deepEqual(actual.debugId.length, 32)
    })

    it('should not change the "debugId" property when it already exists', () => {
        err.debugId = 'debugId'
        const actual = errors.errorBody(err)
        assert.deepEqual(typeof actual.debugId, 'string')
        assert.deepEqual(actual.debugId, 'debugId')
    })

    it('should return the err object back as a JSON string', () => {
        err.debugId = 'debugId'
        const actual = errors.errorBody(err)
        assert.deepEqual(actual, err)
    })
})

describe('errorResponse', () => {
    let err: errors.Error
    const sandbox = sinon.createSandbox()

    beforeEach(() => {
        err = {
            name: 'name',
            details: [
                {
                    field: 'abc',
                    value: 'value',
                    issue: 'bad value',
                    location: 'abc/123'
                }
            ],
            debugId: '',
            message: 'message',
            informationLink: 'link'
        }
        sandbox.stub(errors, 'errorBody')
            .returns(<Error>{ name: 'fake name' })
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should return an APIGatewayProxyResult with status code applied from function argument', () => {
        const actual = errors.errorResponse(201, err)
        assert.deepEqual(actual.statusCode, 201)
    })

    it('should return an APIGatewayProxyResult with the body assigned as result of "errorBody" given the error object', () => {
        const actual = errors.errorResponse(201, err)
        assert.deepEqual(actual.body.name, 'fake name')
    })
})

