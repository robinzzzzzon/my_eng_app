import wdioConstants from './wdio.constants.js'

const specPath = process.env.CI_MERGE_REQUEST_TITLE 
? [`${wdioConstants.basePath}/*smoke*.spec.mjs`] 
: [`${wdioConstants.basePath}/*.spec.mjs`]

export const concurrentConfig = wdioConstants.giveCapsList(specPath, 1, 1)
