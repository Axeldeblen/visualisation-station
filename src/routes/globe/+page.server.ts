import type { PageServerLoad } from './$types';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import credentials from '../../../credentials.json'
import { error } from '@sveltejs/kit';
import { activityWithLatLng, type RowData } from '../../utils/combineAnalyticsWithLocation';
const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

const realTimeCityArgs = { "dimensions": [
  {
    "name": "country"
  },
  {
    "name": "city"
  } 
],
"metrics": [
  {
    "name": "activeUsers",
    "type": "TYPE_INTEGER"
  }
]
}

export const load = (async () => {

  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${import.meta.env.VITE_PROPERTY_ID}`,
      ...realTimeCityArgs,
    });


    return {
      globeActivity: activityWithLatLng(response.rows as RowData) 
    }
  } catch (er) {
    console.log(er);
    throw error(500, er?.message || 'Failed to load analytics data')
  }
}) satisfies PageServerLoad;