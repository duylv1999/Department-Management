const pool = require("../../../db")
const bcrypt = require('bcrypt')
const jwtGenerator = require("../../utils/jwtGenerator")
import {StatusCodes} from 'http-status-codes'

class userController {

    async registry(req, res) {
        const { user_name, user_password} = req.body

        try {
            const user = await pool.query("SELECT * FROM users WHERE user_name =$1", [user_name])

            if (user.rows.length > 0) {
                return res.status(401).json("User already exist;");
            }

            const salt = await bcrypt.genSalt(10)
            const bcryptPassword = await bcrypt.hash(user_password, salt);

            let newUser = await pool.query(
                "INSERT INTO users (user_name, user_password) VALUES($1, $2) RETURNING *",
                [user_name, bcryptPassword]
            )

            const jwtToken = jwtGenerator(newUser.rows[0].user_id);

            // res.status(StatusCodes.OK).json({
            //     success: "true",
            //     msg: "Registry user successfully....."
            // })
            return res.json({ jwtToken })
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Registry user failed....."
            })
            console.log(err.message)
        }
    }


    async login(req, res) {
        const { user_name, user_password } = req.body;

        try {
            const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [user_name]);
            console.log(user)

            if (user.rows.length === 0) {
                return res.status(401).json("Invalid user");
            }

            const validPassword = await bcrypt.compare(
                user_password,
                user.rows[0].user_password
            );

            console.log(user.rows[0].user_password)
            if (!validPassword) {
                return res.status(401).json("Invalid user");
            }

            const jwtToken = jwtGenerator(user.rows[0].user_id);
            console.log("Login successfully........")

            // res.status(StatusCodes.OK).json({
            //     success: "true",
            //     msg: "Login successfully....."
            // })
            return res.json({ jwtToken });
        } catch (err) {
            console.error(err.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                msg: "Login failed....."
            })
        }
    }
}

module.exports = new userController