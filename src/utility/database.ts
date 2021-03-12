import MongoClient from 'mongodb'
import logger from './logger'
import { CallbackFn } from 'mongodb-memory-server-core/lib/types'

const dbConnPool = process.env.DB_POOL || '100'

const state = {
    db: <MongoClient.MongoClient> null,
    mode: <any> null
}

export const connect = function (url: string, done: CallbackFn) {
    if (state.db) return done()

    MongoClient.connect(url, {
            poolSize: parseInt(dbConnPool),
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, dbc) => {
            if (err) {
                const e = new Error(err.message)
                e.name = `${err.code} - ${err.name}`
                return done(e)
            }
            state.db = dbc
            logger.info('Connected to MongoDB')
            done()
        })
}
export const connectCheck = function (url: string, done: CallbackFn) {
    if (state.db) {
        if (state.db.isConnected()) {
            try {
                if (state.db.db('test').collection('test').findOne({})) {
                    logger.info('Connected to MongoDB')
                    return done()
                }
                logger.info('failed to connect to MongoDB')
                return done(new Error('failed to connect to MongoDB'))
            } catch (err) {
                return done(err)
            }
        }
    }
    MongoClient.connect(url, {
            poolSize: parseInt(dbConnPool),
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, dbc) => {
            if (err) {
                const e = new Error(err.message)
                e.name = `${err.code} - ${err.name}`
                return done(e)
            }
            if (state.db) state.db.close()
            state.db = dbc
            logger.info('Connected to MongoDB')
            return done()
        })
}

export const get = function (): MongoClient.MongoClient {
    return state.db
}

// export const close = function (done: CallbackFn) {
//     if (state.db) {
//         state.db.close((err, result) => {
//             state.db = null
//             logger.info('Closed MongoDB connection')
//             done(err)
//         })
//     }
// }
