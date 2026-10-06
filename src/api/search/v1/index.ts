import { HttpClient } from '@/api/common/HttpClient';


export interface SearchId {
  value: string;
}

export interface SearchValueObject {
  id: SearchId;
  name: string;
}

export interface SearchResult {
  events: SearchValueObject[];
  categories: SearchValueObject[];
  cities: SearchValueObject[];
  counties: SearchValueObject[];
  countries: SearchValueObject[];
}



class SearchClient extends HttpClient {
  endpoint = 'api/v1/search';

  search(query: string) {
    return this.client.get<SearchResult>(this.endpoint, { params: { query } });
  }
}

const v1 = new SearchClient();
export default v1;
