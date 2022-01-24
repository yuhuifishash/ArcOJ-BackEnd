let db = require('../../utils/database')
let hsc = require('../../config/http-status-code')

module.exports = {
  'problem': (uid, pid) => {
    return async (req, res, next) => {
      let query = 'SELECT "uid" FROM "problem_maintainer" WHERE "uid" = $1 AND "pid" = $2 LIMIT 1'
      let ret = (await db.query(query, [uid, pid])).rows[0]
      if (ret) {
        return next()
      } else {
        return res.sendStatus(hsc.forbidden)
      }
    }
  },
  'problemset': (uid, psid) => {
    return async (req, res, next) => {
      let query = 'SELECT "uid" FROM "problemset_maintainer" WHERE "uid" = $1 AND "psid" = $2 LIMIT 1'
      let ret = (await db.query(query, [uid, psid])).rows[0]
      if (ret) {
        return next()
      } else {
        return res.sendStatus(hsc.forbidden)
      }
    }
  },
  'course': (uid, cid) => {
    return async (req, res, next) => {
      let query = 'SELECT "uid" FROM "course_maintainer" WHERE "uid" = $1 AND "cid" = $2 LIMIT 1'
      let ret = (await db.query(query, [uid, cid])).rows[0]
      if (ret) {
        return next()
      } else {
        return res.sendStatus(hsc.forbidden)
      }
    }
  }
}
