export type RealtimeMessage =
  | {
      type: 'player_joined'
      playerId: string
    }
  | {
      type: 'setup_ready'
      playerId: string
    }
  | {
      type: 'move_ray'
      entry: number
    }
  | {
      type: 'ray_result'
      result: string
    }
  | {
      type: 'sync_state'
      state: unknown
    }
