const employeeRouter = require("./employees")
const departmentRouter = require("./department")
const userRouter = require("./users")

function route(app) {
    app.use("/employees", employeeRouter)
    app.use("/departments", departmentRouter)
    app.use("/user", userRouter)
}

module.exports = route;