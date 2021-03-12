import assert from 'assert'
import httpMocks from 'node-mocks-http'
import * as work from '../handlers'

const next = (a: any) => a

describe('ping', () => {
    beforeAll(async () => {
    })

    beforeEach(() => {
    })

    afterEach(() => {
    })

    it('should receive pong', async () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()

        await work.ping(req, res, next)
        assert.equal(res._getStatusCode(), 200)
        assert.equal(res._getData(), '\"pong\"')
    })
})
