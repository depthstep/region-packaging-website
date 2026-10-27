import { defineCliConfig } from 'sanity/cli'

// Used by `npm run seed:import` and `npm run studio` (standalone studio).
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
