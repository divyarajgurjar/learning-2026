import { ApiResponse, SortBy } from '../types';

const BASE_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

export async function fetchVideos(
  page: number = 1,
  limit: number = 12,
  query: string = 'javascript',
  sortBy: SortBy = 'latest'
): Promise<ApiResponse['data']> {
  const url = `${BASE_URL}?page=${page}&limit=${limit}&query=${encodeURIComponent(query)}&sortBy=${encodeURIComponent(sortBy)}`;
  console.log(`Fetching from: ${url}`);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`Failed to fetch videos: ${response.status}`);
    }
    const result: any = await response.json();
    if (!result.data) {
      console.warn('API returned unsuccessful response or no data:', result);
      return {
        page: 1,
        limit: 12,
        totalPages: 0,
        totalItems: 0,
        data: []
      };
    }
    return result.data;
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw error;
  }
}

export function formatCompactNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseInt(value) : value;
  if (isNaN(num)) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function formatViews(views: string): string {
  return formatCompactNumber(views) + ' views';
}

export function formatDuration(pt: string): string {
  // Simple PT duration parser (e.g. PT15M12S)
  const matches = pt.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return '0:00';
  const [, h, m, s] = matches;
  const parts = [];
  if (h) parts.push(h);
  parts.push(m ? m.padStart(2, '0') : h ? '00' : '0');
  parts.push(s ? s.padStart(2, '0') : '00');
  return parts.join(':');
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}
