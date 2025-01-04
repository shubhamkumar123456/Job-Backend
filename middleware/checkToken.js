const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        // console.log(token)

        if (!token) {
            return res.json({ msg: "token not found", success: false })
        }
        
        console.log(process.env.JWT_SECRET)
        let decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decode",decode)
        req.user = decode
        next()
    } catch (error) {
        return res.json({ msg: "invalid token", success: false })
    }


}


module.exports = checkToken