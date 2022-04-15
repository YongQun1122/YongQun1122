declare interface Pagination {
  limit: number;
  offset: number;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}