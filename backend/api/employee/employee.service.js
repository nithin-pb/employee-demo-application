const con = require("../../config/sql.config");


module.exports.getAllEmployee = async function getAllEmployee() {
    try {
        const query = `SELECT Address      as address,
                              Age          as age,
                              Email        as email,
                              EmployeeId   as employeeId,
                              FullName     as name,
                              MobileNumber as phone
                       FROM employee`;
        return await databaseOperations(query)
    } catch (e) {
        throw e
    }
}

module.exports.createNewEmployee = async function createNewEmployee(employee) {
    try {
        const query = `INSERT INTO employee (EmployeeId, FullName, Email, Age, Address, MobileNumber)
                       values ('${employee.employeeId}', '${employee.name}', '${employee.email}', '${employee.age}', '${employee.address}', '${employee.phone}');`;
        return await databaseOperations(query)
    } catch (e) {
        throw e
    }
}

module.exports.updateEmployee = async function updateEmployee(employee) {
    try {
        const query = `UPDATE employee
                       SET FullName     = '${employee.name}',
                           Email        = '${employee.email}',
                           Age          = '${employee.age}',
                           Address      ='${employee.address}',
                           MobileNumber = '${employee.phone}'
                       WHERE EmployeeId = '${employee.employeeId}'`;
        console.log(query)
        return await databaseOperations(query)
    } catch (e) {
        throw e
    }
}

module.exports.deleteEmployee = async function deleteEmployee(employeeId) {
    try {
        const query = `DELETE
                       FROM employee
                       WHERE EmployeeId = '${employeeId}'`;
        return await databaseOperations(query)
    } catch (e) {
        throw e
    }
}


/**
 *
 * @param query - query
 * @return {Promise<void>}
 */


module.exports.getSingleEmployee = async function getSingleEmployee(employeeId) {
    try {
        const query = `SELECT Address      as address,
                              Age          as age,
                              Email        as email,
                              EmployeeId   as employeeId,
                              FullName     as name,
                              MobileNumber as phone
                       FROM employee
                       WHERE EmployeeId = '${employeeId}'
                       LIMIT 1`;
        return await databaseOperations(query)
    } catch (e) {
        throw e
    }
}

async function databaseOperations(query) {
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
                if (error) {
                    reject(error)
                }
                resolve(results);
            }
        );
    })
}


module.exports.databaseOperations = databaseOperations