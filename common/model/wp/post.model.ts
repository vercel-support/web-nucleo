interface IRenderedString {
  rendered: string;
}

export interface IPost {
  id: number;
  link: string;
  title: IRenderedString;
  excerpt: IRenderedString;
  featured_media: number;
}

export interface IMyPost extends IPost {
  titleRendered: string;
  excerptRendered: string;
  featuredMediaUrl: string;
}
