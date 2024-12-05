export type City = {
  guid: string
  latitude: number
  longitude: number
  address: string
  isActive: boolean
  tags: Array<string>
}

export type QueryParams = {
  tag?: string
  isActive?: boolean | string
  from?: string
  to?: string
  distance?: number
}

export type Params = {
  jobId?: string
}
