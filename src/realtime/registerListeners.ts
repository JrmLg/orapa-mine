export function registerListeners(
  channel: any,
  callback: (payload: any) => void
) {
  channel.on(
    'broadcast',
    { event: 'player_joined' },
    (payload: any) => callback(payload)
  )

  channel.on(
    'broadcast',
    { event: 'setup_ready' },
    (payload: any) => callback(payload)
  )

  channel.on(
    'broadcast',
    { event: 'move_ray' },
    (payload: any) => callback(payload)
  )

  channel.on(
    'broadcast',
    { event: 'ray_result' },
    (payload: any) => callback(payload)
  )

  return channel
}
