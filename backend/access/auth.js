const { executeSqlQuery } = require('./sql/sql');

exports.saveToken = async function(email, token) {
    const statement = 'UPDATE user SET token = ? WHERE email = ?;';
    const result = await executeSqlQuery(statement, [token, email]);
    return result;
}

exports.checkToken = async function(email, token) {
    if (!email) {
        return false;
    }
    const statement = 'SELECT token FROM user WHERE email = ?;';
    const result = await executeSqlQuery(statement, [email]);
    if (!result || result != token) {
        return false;
    } else {
        return true;
    }
}