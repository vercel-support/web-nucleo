import WPAPI from 'wpapi';

import { BLOG_URL } from '../../common/consts';
import { IPost, IMyPost } from '../../common/model/wp/post.model';
import { IMedia } from '../../common/model/wp/media.model';

export const getLastPosts = async (): Promise<IMyPost[]> => {
  const wp = new WPAPI({ endpoint: `${BLOG_URL}/wp-json` });
  const wpPosts = (await wp.posts().perPage(3)) as IPost[];
  const posts: IMyPost[] = [];
  for (const wpPost of wpPosts) {
    const featuredMediaUrl = ((await wp
      .media()
      .id(wpPost.featured_media)) as IMedia).source_url;
    posts.push({
      ...wpPost,
      titleRendered: wpPost.title.rendered,
      excerptRendered: wpPost.excerpt.rendered.replace(
        ' [&hellip;]',
        '&hellip;'
      ),
      featuredMediaUrl,
    });
  }
  return posts;
};
