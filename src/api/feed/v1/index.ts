import { HttpClient } from '@/api/common/HttpClient';


export interface FeedSection {
  type: string;
}

export interface FeedResult {
  sections: FeedSection[];
}



class FeedClient extends HttpClient {
  endpoint = 'api/v1/feed';

  get() {
    return this.client.get<FeedResult>(this.endpoint);
  }
}

const v1 = new FeedClient();
export default v1;
