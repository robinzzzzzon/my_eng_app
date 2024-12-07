const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function printSmth() {
    core.notice('Hello from main.js!')
}

printSmth()