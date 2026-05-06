export interface YoutubeVideo {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
      maxres?: {
        url: string;
      };
    };
    channelTitle: string;
    tags?: string[];
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

export interface ApiResponse {
  data: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
    data: {
      items: YoutubeVideo;
    }[];
  };
}

export type SortBy = 'mostLiked' | 'mostViewed' | 'latest' | 'oldest';
