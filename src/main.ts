import * as core from '@actions/core'
import {Webhook, MessageBuilder} from 'discord-webhook-node'

async function run(): Promise<void> {
  try {
    const hook = new Webhook(core.getInput('webhook'))
    const embed = new MessageBuilder()
      .setTitle(core.getInput('title'))
      .setColor((core.getInput('color') as unknown) as number)
      .setDescription(core.getInput('text'))
      .addField('Project', core.getInput('project'), true)
      .addField('Branch', core.getInput('branch'), true)
      .addField('Workflow', core.getInput('workflow'), true)
      .setTimestamp()
    await hook.send(embed)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
