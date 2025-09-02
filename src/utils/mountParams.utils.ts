/**
 * Utility function to mount URL parameters
 * Based on the pattern from vueflix-netflix-clone-vue
 */

export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Mounts query parameters into a URL string
 * @param baseUrl - The base URL
 * @param params - Object with query parameters
 * @returns Complete URL with query parameters
 */
export function mountParams(baseUrl: string, params: QueryParams = {}): string {
  const url = new URL(baseUrl, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Mounts query parameters for API requests
 * @param baseUrl - The base URL
 * @param params - Object with query parameters
 * @returns Complete URL with query parameters
 */
export function mountApiParams(
  baseUrl: string,
  params: QueryParams = {}
): string {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Builds CoinGecko API URL with parameters
 * @param params - Query parameters for the API
 * @returns Complete CoinGecko API URL
 */
export function buildCoinGeckoUrl(params: QueryParams = {}): string {
  const baseUrl =
    import.meta.env.VITE_COINGECKO_API_URL ||
    'https://api.coingecko.com/api/v3/simple/price';
  return mountApiParams(baseUrl, params);
}

/**
 * Builds URL with pagination parameters
 * @param baseUrl - The base URL
 * @param page - Page number
 * @param limit - Items per page
 * @param additionalParams - Additional query parameters
 * @returns Complete URL with pagination
 */
export function buildPaginatedUrl(
  baseUrl: string,
  page: number = 1,
  limit: number = 10,
  additionalParams: QueryParams = {}
): string {
  const params = {
    page: page.toString(),
    limit: limit.toString(),
    ...additionalParams,
  };

  return mountParams(baseUrl, params);
}
