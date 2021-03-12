const fs = require('fs')
const cp = require('child_process')

process.chdir(__dirname)

// Get the files to load 
const collections = fs.readdirSync('./postman-collections')

async function run() {
    const npmStart = cp.spawn('npm', ['run', 'start:developer'], { shell: true, cwd: '..' })
    npmStart.stdout.on('data', data => {
        if (data.toString().toLowerCase().includes('api started')) {
            console.log('running postman tests with newman')
            try {
                const newman = (process.platform === 'win32') ? 'newman.cmd' : 'newman'
                let res
                for (const collection of collections) {
                    console.log(collection);
                    res = cp.spawnSync(newman, ['run', `./test/postman-collections/${collection}`, '--reporters', 'cli,junit', '--reporter-junit-export', './test-reports/junit.xml'], { stdio: 'inherit', cwd: '..' })
                }
                console.log('stopping express API and mongo memory server')
                cp.spawn('killall', ['node'], { shell: true, cwd: '..' })
                console.log('exiting with status code', res.status)
                process.exit(res.status)
            } catch (ex) {
                console.log('got an err', ex)
                cp.spawn('killall', ['node'], { shell: true, cwd: '..' })
                process.exit(1)
            }
        }
    })
    npmStart.stdout.pipe(process.stdout)
    npmStart.stderr.pipe(process.stderr)
    npmStart.on('error', err => {
        console.log('error', err)
        cp.spawn('killall', ['node'], { shell: true, cwd: '..' })
        process.exit(1)
    })
}

run()