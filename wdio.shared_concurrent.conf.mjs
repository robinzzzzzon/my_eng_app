import wdioConstants from './wdio.constants.mjs'

const specPath = process.env.CI_MERGE_REQUEST_TITLE 
? [`${wdioConstants.basePath}/*smoke*.spec.mjs`] 
: [`./source/tests/specs/*.spec.mjs`]

export const concurrentConfig = wdioConstants.giveCapsList(specPath, 1, 1)
