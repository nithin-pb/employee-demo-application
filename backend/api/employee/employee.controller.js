const service = require('./employee.service');

module.exports.getAllEmployee = async function getAllEmployee(req, res) {
    try {

        const result = await service.getAllEmployee()

        return res.status(200).json({
            code: 200,
            success: true,
            data: result
        })
    } catch (e) {
        return res.status(400).json({code: 400, success: false, error: e.message})
    }
}

module.exports.updateEmployee = async function updateEmployee(req, res) {
    try {
        const {name, phone, age = 0, address, email, employeeId} = req.body
        if (!name || !phone || !age || !address || !email || !employeeId) {
            return res.status(400).json({
                code: 400,
                success: false,
                error: 'Invalid parameter exception'
            })
        }

        const params = {
            name: name,
            phone: phone,
            age: age,
            address: address,
            email: email,
            employeeId: employeeId
        }

        await service.updateEmployee(params)
        return res.status(200).json({
            code: 200,
            success: true,
            data: true
        })
    } catch (e) {
        return res.status(400).json({code: 400, success: false, error: e.message})
    }
}

module.exports.deleteEmployee = async function deleteEmployee(req, res) {
    try {
        const employeeId = req.params['employeeId']
        if (!employeeId) {
            return res.status(400).json({
                code: 400,
                success: false,
                error: 'Invalid parameter exception'
            })
        }
        await service.deleteEmployee(employeeId)
        return res.status(200).json({
            code: 200,
            success: true,
            data: true
        })
    } catch (e) {
        return res.status(400).json({code: 400, success: false, error: e.message})
    }
}

module.exports.getSingleEmployee = async function getSingleEmployee(req, res) {
    try {
        const employeeId = req.params['employeeId']
        if (!employeeId) {
            return res.status(400).json({
                code: 400,
                success: false,
                error: 'Invalid parameter exception'
            })
        }

        const result = await service.getSingleEmployee(employeeId)
        return res.status(200).json({
            code: 200,
            success: true,
            data: result[0]
        })
    } catch (e) {
        return res.status(400).json({code: 400, success: false, error: e.message})
    }
}

module.exports.createNewEmployee = async function createNewEmployee(req, res) {
    try {
        const {name, phone, age, address, email, employeeId} = req.body
        if (!name || !phone || !age || !address || !email || !employeeId) {
            return res.status(400).json({
                code: 400,
                success: false,
                error: 'Invalid parameter exception'
            })
        }

        const params = {
            name: name,
            phone: phone,
            age: age,
            address: address,
            email: email,
            employeeId: employeeId
        }

        const result = await service.createNewEmployee(params)
        return res.status(200).json({
            code: 200,
            success: true,
            data: true,
            id: result.insertId
        })
    } catch (e) {
        return res.status(400).json({code: 400, success: false, error: e.message})
    }
}