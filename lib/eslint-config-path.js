const fs = require('fs');
const path = require('path');

/**
 * Resolves the suggested current working directory path
 * @param  {String} currentDir  The path of the file(s) to be linted
 * @param  {String} config      Where the eslint config sits (.eslintrc.* |package.json)
 * @return {String}             The nearest directory with a config file
 */
function resolve(currentDir, config) {
    if (!currentDir || !config) {
        return null;
    }

    const containsConfig = fs
        .readdirSync(currentDir)
        .filter((f) => f.includes(config)).length > 0;

    if (containsConfig) {
        return currentDir;
    }

    // Check for hitting the root without finding a config file
    const parent = path.dirname(currentDir);
    if (parent === currentDir) {
        return null;
    }

    return resolve(parent, config);
};

exports.resolve = resolve;
