'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    // Controla as transações do banco de dados
    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    // insere um ou muitos endereços para o usuário
    await user.adresses().createMany(addresses, trx)

    // Caso não aja sucesso em uma das operações do banco, ele executa um rollback
    await trx.commit()

    return user
  }
}

module.exports = UserController
