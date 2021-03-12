import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from './utility/logger'
import baseRoutes from './base/routes'

export const startAPI = function (): Promise<any> {
    logger.info('Starting Express server...')

    const app = express()

    const port = process.env.PORT
    let apiBase = process.env.API_BASE

    // This is NOT best practice.  This is becuase the current deployment implementation requires
    // that the API get the "full" directory structure, including the virtual folder this was
    // deployed into.  This is a work around only.  Not for long term use.  It is bad practice
    // for the code to have an incling of how it is deployed.
    const rootFolder = process.env.ROOT_FOLDER

    if (apiBase.lastIndexOf('/') !== apiBase.length - 1) {
        apiBase = `${apiBase}/`
    }
    if (apiBase.indexOf('/') !== 0) {
        apiBase = `/${apiBase}`
    }

    app.use(express.json())

    // Log all requests
    app.use((req, res, next) => {
        logger.info(`Request: ${req.method} ${req.originalUrl}`)
        next()
    })


    app.use(cors())
    app.use(bodyParser.json())
    app.use(apiBase, baseRoutes)
    app.use(`/${rootFolder}${apiBase}`, baseRoutes)

    // for any other routes, make sure you accept
    // with and without rootFolder at the beginning of the base.  example below

    // app.use(`${apiBase}example`, exampleRoutes)
    // app.use(`/${rootFolder}${apiBase}example`, exampleRoutes)

    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            logger.info(`Express server running on port ${port}`)
            resolve()
        })
    })
}
