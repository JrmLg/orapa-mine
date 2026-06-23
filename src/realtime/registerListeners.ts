export function registerListeners(
  channel: any,
  callback: (payload: any) => void
) {
  channel.on(
    'broadcast',
    { event: 'player_joined' },
    payload => callback(payload)
  )

  channel.on(
    'broadcast',
    { event: 'setup_ready' },
    payload => callback(payload)
  )

  channel.on(
    'broadcast',
    { event: 'move_ray' },
    payload => callback(payload)
  )

  channel.on(
    'broadcast',
    { event: 'ray_result' },
    payload => callback(payload)
  )

  return channel
}
