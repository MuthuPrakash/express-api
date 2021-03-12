const fs = require('fs')
const cp = require('child_process')

process.chdir(__dirname)

async function run() {
    const npmStart = cp.spawn('npm', ['run', 'start:developer'], { shell: true, cwd: '..' })
    npmStart.stdout.on('data', data => {
        if (data.toString().toLowerCase().includes('api started')) {
            console.log('running cucumber tests')
            try {
                const npm = (process.platform === 'win32') ? 'npm.cmd' : 'npm'
                const res = cp.spawnSync(npm, ['run', 'cucumber'], { stdio: 'inherit', cwd: '..' })
                console.log('stopping serverless')
                npmStart.kill()
                console.log('exiting with status code', res.status)
                process.exit(res.status)
            } catch (ex) {
                console.log('got an err', ex)
                npmStart.kill()
                process.exit(1)
            }
        }
    })
    npmStart.stdout.pipe(process.stdout)
    npmStart.stderr.pipe(process.stderr)
    npmStart.on('error', err => {
        console.log('error', err)
        process.exit(1)
    })
}
