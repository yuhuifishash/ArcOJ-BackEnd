import express from 'express'
const router = express.Router()
import hsc from '../../config/http-status-code.mjs'
import sr from 'string-random'
import fs from 'fs-extra'
import path from 'path'
const dirname = path.dirname
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
import fc from '../midwares/form-check.mjs'

router.get('/kick-all', lc, async (req, res) => {
  let content = `export default '${sr(20)}'`
  await fs.writeFile(path.resolve(__dirname, '../../config/salt.mjs'), content)
  return res.sendStatus(hsc.ok)
})

router.post('/strict-mode', lc, fc(['body'], ['passcode']),
  async (req, res) => {
    let { enable, passcode } = req.body
    let conf = {
      'enable': enable,
      'code': passcode
    }
    let content = 'export default ' + JSON.stringify(conf)
    await fs.writeFile(path.resolve(__dirname, '../../config/strict-mode.mjs'), content)
    return res.sendStatus(hsc.ok)
  })
export default router