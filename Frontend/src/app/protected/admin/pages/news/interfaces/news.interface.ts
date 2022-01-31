export interface News {
  title: string,
  description: string,
  newsUuid: number,
  uuid?: number;
}

export interface NewsResponse {
  new?: News;
  uuid?: number;
  news: News[];
  ok?: boolean,
  msg?: string,
  error?: Error
  title?: string,
  description?: string,
  newsUuid?: number
}
