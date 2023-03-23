import type { PageServerLoad } from './globe/$types';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import credentials from '../../credentials.json'
import { error } from '@sveltejs/kit';
import { activityWithLatLng, type RowData } from '../utils/combineAnalyticsWithLocation';
import { REALTIME_REPORT_INVALIDATION } from '../constants';
const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

const realTimeCityArgs = {
  "dimensions": [
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

export const load = (async ({ depends }) => {
  depends(REALTIME_REPORT_INVALIDATION)

  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${import.meta.env.VITE_PROPERTY_ID}`,
      ...realTimeCityArgs,
    });


    return {
      activeUsers: response.rows?.reduce((acc, { metricValues }) => acc + Number(metricValues?.[0].value), 0) || 0,
      globeActivity: activityWithLatLng(response.rows as RowData)
    }
  } catch (er) {
    console.error(er);
    if (er instanceof Error) {
      throw error(500, er?.message || 'Failed to load analytics data')
    } else {
      throw error(500, 'Failed to load analytics data')
    }
  }
}) satisfies PageServerLoad;