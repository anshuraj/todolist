/**
 * Generate uuid
 * Ref: https://gist.github.com/jed/982883
*/
const uuid = a => a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid); // eslint-disable-line no-mixed-operators

export default uuid;