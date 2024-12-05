import * as yup from 'yup'

export const getCitiesByTagSchema = yup.object({
  tag: yup.string().required('Tag is required'),
  isActive: yup
    .boolean()
    .transform(value => {
      if (value === 'true') return true
      if (value === 'false') return false
      return value
    })
    .optional(),
})

export const getCityByGuidSchema = yup.object({
  guid: yup.string().required('Guid is required').uuid('Invalid GUID format'),
})

export const getDistanceBetweenCitiesSchema = yup.object({
  from: yup.string().required('from is required').uuid('Invalid GUID format'),
  to: yup.string().required('to is required').uuid('Invalid GUID format'),
})

export const getAreaSchema = yup.object({
  from: yup.string().required('from is required').uuid('Invalid GUID format'),
  distance: yup.number().required('distance is required'),
})

export const getAreaResultSchema = yup.object({
  jobId: yup.string().required('jobId is required'),
})
