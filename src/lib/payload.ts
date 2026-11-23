import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getPayloadClient = () => getPayload({ config })

//The logged-in customer, or null. Runs once per request.
export const getCurrentCustomer = cache(async () => {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  return user?.collection === 'customers' ? user : null
})

//for pages that need a customer
export async function requireCustomer() {
  const customer = await getCurrentCustomer()
  if (!customer) redirect('/login')
  return customer
}