export interface INewsletterSubscriber {
  subscriber_id: number;
  email: string;
  subscribed_at: string;
}

export interface INewsletterSubscribersResponse {
  subscribers: INewsletterSubscriber[];
  currentPage: number;
  totalPages: number;
  total: number;
}
