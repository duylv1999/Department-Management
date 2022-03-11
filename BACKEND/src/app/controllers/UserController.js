

class UserController {

    login(req, res) {
        const { username, password } = req.body

        console.log(username, password)
    }

}

module.exports = new UserController