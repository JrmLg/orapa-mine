import type { RealtimeMessage } from './types'

export async function sendMessage(
  channel: any,
  message: RealtimeMessage
) {
  await channel.send({
    type: 'broadcast',
    event: message.type,
    payload: message
  })
}
