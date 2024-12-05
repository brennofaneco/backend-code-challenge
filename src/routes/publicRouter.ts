import { Router } from 'express'
import { validateQueryParams } from '../middleware/validateQueryParams'
import {
  getAreaResultSchema,
  getAreaSchema,
  getCitiesByTagSchema,
  getDistanceBetweenCitiesSchema,
} from '../schema'
import * as queueService from '../services/business-logic/queueService'
import * as cityService from '../services/business-logic/cityService'
import { authenticate } from '../middleware/authetication'

const router = Router()

router.get('/', (_, res) => {
  res.send('Server is running...')
})

router.get('/all-cities', authenticate, (req, res) => {
  const cities = cityService.getAllCities()
  res.status(200).json(cities)
  return
})

router.get(
  '/cities-by-tag',
  authenticate,
  validateQueryParams(getCitiesByTagSchema),
  (req, res) => {
    const { tag, isActive } = req.query
    if (!tag) {
      res.status(400).send({ message: 'tag not found' })
      return
    }
    const cities = cityService.getCitiesByTag(tag, Boolean(isActive))
    res.status(200).json({ cities })
  },
)

router.get(
  '/distance',
  authenticate,
  validateQueryParams(getDistanceBetweenCitiesSchema),
  (req, res) => {
    const { from, to } = req.query

    if (!from) {
      res.status(400).send({ message: 'not found' })
      return
    }

    if (!to) {
      res.status(400).json({ message: 'not found' })
      return
    }

    const distance = cityService.getDistanceBetweenCities(from, to) ?? []

    const result = {
      from: {
        guid: from,
      },
      to: {
        guid: to,
      },
      unit: 'km',
      distance,
    }

    res.status(200).json({ ...result })
  },
)

router.get(
  '/area',
  authenticate,
  validateQueryParams(getAreaSchema),
  async (req, res) => {
    const { from, distance } = req.query

    if (!from) {
      res.status(404).send('from is required')
      return
    }
    if (!distance) {
      res.status(404).send('distance is required')
      return
    }

    try {
      const jobId = await queueService.startCitySearch(from, distance)
      res.status(202).json({
        message: 'Job started',
        resultsUrl: `${req.protocol}://${req.get('host')}/area-result/${jobId}`,
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  },
)

router.get(
  '/area-result/:jobId',
  authenticate,
  validateQueryParams(getAreaResultSchema),
  (req, res) => {
    const { jobId } = req.params
    if (!jobId) return

    try {
      const job = queueService.getJobStatus(jobId)
      if (job.status === 'in-progress') {
        res.status(202).json({ status: 'in-progress' })
      }
      res.status(200).json({ cities: job.result })
    } catch (error) {
      res.status(404).json({ error: error })
    }
  },
)

export default router
