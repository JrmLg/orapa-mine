export function registerListeners(
  channel: any,
  callback: (message: unknown) => void
) {
  channel.on(
    'broadcast',
    { event: '*' },
    callback
  )

  return channel
}
