import { supabase } from '../lib/supabase'

export function createChannel(
  gameId: string
) {
  return supabase.channel(
    `game-${gameId}`
  )
}
