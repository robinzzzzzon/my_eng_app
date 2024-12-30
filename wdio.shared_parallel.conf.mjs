import wdioConstants from './wdio.constants.mjs'

const specPath = process.env.CI_MERGE_REQUEST_TITLE 
? [`${wdioConstants.basePath}/parallel/*smoke*.spec.mjs`] 
: [`${wdioConstants.basePath}/parallel/*.spec.mjs`]

export const parallelConfig = wdioConstants.giveCapsList(specPath, 2, 2)
