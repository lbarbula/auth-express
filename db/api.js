var knex = require('./knex')

module.exports = {
  findUserByName: function (username) {
    return knex('user').where('username', username).returning('id').first()
  },
  createUser: function (body) {
    return knex('user').insert(body, 'id')
  }
}
