export interface ListItem {
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  picture: {
    thumbnail: string
  }
  id: {
    value: string
  }
}

export declare type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error';

