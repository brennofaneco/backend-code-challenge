import fs from 'fs-extra'
import path from 'path'
import { City } from '../../types'

let cities: City[] = []

export const loadCities = async () => {
  const filePath = path.resolve(__dirname, '../../../addresses.json')
  const content = await fs.readJson(filePath)

  cities = content
}

export const getAllCities = () => cities

export const getCitiesByTag = (tag: string, isActive: boolean) =>
  cities.filter(city => city.tags.includes(tag) && city.isActive === isActive)

export const getCityByGuid = (guid: string): City | undefined =>
  cities.find(city => city.guid === guid)
