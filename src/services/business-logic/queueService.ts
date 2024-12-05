import { City } from '../../types';
import * as cityService from '../business-logic/cityService'

const jobs: { [jobId: string]: { status: string; result?: City[] | unknown } } = {}

function generateJobId(): string {
  // mocking jobId
  return `2152f96f-50c7-4d76-9e18-f7033bd14428`
}

export async function startCitySearch(
  from: string,
  distance: number,
): Promise<string> {
  const jobId = generateJobId()

  jobs[jobId] = { status: 'in-progress' }

  setTimeout(async () => {
    try {
      // Simulate a long-running operation
      const result = await cityService.getCitiesWithinDistance(from, distance)
      jobs[jobId] = { status: 'completed', result  }
    } catch (error) {
      jobs[jobId] = { status: 'failed', result: error }
    }
  }, 0) 
  return jobId
}

export function getJobStatus(jobId: string) {
  const job = jobs[jobId]
  if (!job) {
    throw new Error('Job not found')
  }
  return job
}