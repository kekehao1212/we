// let domain = 'https://neosphs.dev.de5.io'
let domain = 'http://123.206.84.238:3001'
export default {
  login: `${domain}/api/wx/student/login`,
  register: `${domain}/api/wx/student/register`,
  consult: `${domain}/api/consultants`,
  publish: `${domain}/api/statuses`,
  tweets: `${domain}/api/statuses`,
  articles: `${domain}/api/articles`,
  avator: `${domain}/api/users/_/avator`,
  domain: domain,
  follow: `${domain}/api/follows`
  // checkFollow: `${domain}/api/follows/followee${psyId}`
}
// 'https://neosphs.dev.de5.io/api/wx/student/login'