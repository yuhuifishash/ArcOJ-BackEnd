let express = require('express')
let router = express.Router()
let hsc = require('../config/http-status-code')
let fc = require('./midwares/form-check')
let tokenUtils = require('../utils/token')
let db = require('../utils/database')
let md5 = require('../utils/md5')
let salt = require('../config/secret')

router.post('/', fc(['body'], ['username', 'password']), async (req, res) => {
  try {
    let md5C = tokenUtils.get(req, 'ec')['md5C']
    tokenUtils.remove(res, 'ec')
    if (md5C !== md5(req.body['emailCaptcha'] + salt)) throw Error('Captcha is incorrect')
    let username = req.body['username'], password = req.body['password']
    let sqlStr = 'SELECT "uid", "gid", "nickname" FROM "user" WHERE "email" = $1 AND NOT "removed" LIMIT 1'
    let sqlRes = await db.query(sqlStr, [username])
    if (!sqlRes.rows[0]) throw Error('No such user')
    let uid = sqlRes.rows[0]['uid'], permission = sqlRes.rows[0]['gid'], nickname = sqlRes.rows[0]['nickname']
    //权限映射
    let permMap = [-1, 2, 1, 0]
    permission = permMap[permission]
    sqlStr = 'UPDATE "user" SET "password" = "hash_password"($1) WHERE "uid" = $2'
    await db.query(sqlStr, [password, uid])
    let account = {
      uid: uid,
      username: username,
      nickname: nickname,
      permission: permission
    }
    tokenUtils.write(res, 'acc', account)
    return res.status(hsc.ok).json({
      ok: true,
      userData: account
    })
  } catch (err) {
    console.error(err)
    return res.status(hsc.captchaMismatch).json({ ok: false })
  }
})

module.exports = router
