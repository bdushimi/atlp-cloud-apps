/**
 * AWS Lambda now enables the use of ECMAScript (ES) modules in Node.js 14 runtimes. 
 * This feature allows Lambda customers to use dependency libraries that are configured as ES modules, 
 * or to designate their own function code as an ES module. 
 * It provides customers the benefits of ES module features like import/export operators, 
 * language-level support for modules, strict mode by default, and improved static analysis and tree shaking.
 * 
 * You may designate function code as an ES module in one of two ways. 
 * The first way is to specify the “type” in the function’s package.json file. 
 * By setting the type to “module”, you designate all “.js” files in the package to be treated as ES modules
 * 
 * 
 * The second way to designate a function as either an ES module or a CommonJS module is by using the file name extension. 
 * File name extensions override the package type directive.
 * 
 * 
 * File names ending in .cjs are always treated as CommonJS modules. 
 * File names ending in .mjs are always treated as ES modules. 
 * File names ending in .js inherit their type from the package. 
 * You may mix ES modules and CommonJS modules within the same package. 
 * Packages are designated as CommonJS by default:
 */
export const sendResponse = (statusCode, body) => {
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        }
    }
    return response
}