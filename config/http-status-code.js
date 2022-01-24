module.exports = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  resetContent: 205,

  resOccupied: 296, //资源被占用
  captchaMismatch: 297,
  passwdMismatch: 298, //用户名或密码错误
  parseErr: 299,

  badReq: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  unsupportedType: 415,
  locked: 423,
  tooManyReq: 429,
  loginTimeOut: 440,
  illegal: 451
}
