import { startAPI } from './base-api'


// const moreEnvs = JSON.parse(process.env.SECRETS || '{ }')
process.env.PORT = '3100'
process.env.API_BASE = '/api/v1/'



startAPI()
    .then(() => console.log('API Started'))
