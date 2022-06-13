import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { POSTS_DATA } from '../../constants/posts.constant';
import { IPosts } from '../../interfaces/posts/post.interface';

@Injectable()
export class PostsService {
  getPosts(): IPosts[] {
    return POSTS_DATA as IPosts[];
  }

  getPostsById(postId: number): IPosts {
    const data = POSTS_DATA as IPosts[];
    const post = data.find((x) => x.id === postId);
    if (!post) {
      throw new NotFoundException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found',
          result: 'Post not found',
        },
        'Post not found1',
      );
    }
    return post as IPosts;
  }
}
