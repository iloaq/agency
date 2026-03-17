// Example feature service
// This demonstrates how to structure a feature module

import { cache } from '@/lib/cache/redis';

export class ExampleService {
  async getData() {
    // Example: Check cache first
    const cached = await cache.get('example:data');
    if (cached) return cached;

    // Example: Fetch from Directus
    // const directus = getDirectusClient();
    // const data = await directus.request(...);

    // Example: Cache result
    // await cache.set('example:data', data, 3600);

    return { message: 'Example feature' };
  }
}

export const exampleService = new ExampleService();
