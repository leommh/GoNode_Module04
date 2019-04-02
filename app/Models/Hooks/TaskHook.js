'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = (exports = module.exports = {})

TaskHook.sendNewTaskMail = async taskInstance => {
  // dirty -> lugar do model que salva informações recentes
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) {
    return
  }

  // Traz o usuário relacionado com a task
  const { email, username } = await taskInstance.user().fetch()

  // Traz o arquivo se ele existir
  const file = await taskInstance.file().fetch()

  const { title } = taskInstance

  // Cria a tarefa
  Kue.dispatch(
    Job.key,
    { email, username, file, title },
    {
      attempts: 3
    }
  )
}
