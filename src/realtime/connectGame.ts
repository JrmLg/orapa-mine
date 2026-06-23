import { createChannel } from './createChannel'

export async function connectGame(
  gameId: string
) {
  const channel = createChannel(gameId)

  await channel.subscribe()

  return channel
}
