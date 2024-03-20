const github = require('@actions/github')

const { context } = github

/**
 * Generates a docker image
 * @param {string} baseName
 * @returns {object} The generated docker image name and tag
 */
function generateDockerImageName(baseName) {
  // generate string from the current time in RFC3339 format without special characters
  const buildtime = new Date().toISOString().replace(/[-:.]/g, '-').slice(0, -5)
  const tag = `${context.ref}-time-${buildtime}-commit-${context.sha}`.replace(
    /\//g,
    '-'
  )
  const imageName = `${baseName}:${tag}`
  return {
    imageName,
    tag
  }
}

module.exports = { generateDockerImageName }
