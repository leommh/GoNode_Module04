'use strict'

const Model = use('Model')

class Project extends Model {
  user () {
    // Pertence a um usuario
    return this.belongsTo('App/Models/User')
  }

  // Pode ter várias tarefas
  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
