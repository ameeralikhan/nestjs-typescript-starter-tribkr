import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { POSTS_DATA } from '../../constants/posts.constant';
import { IPosts } from '../../interfaces/posts/post.interface';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return posts array', () => {
    expect(service.getPosts()).toBe(POSTS_DATA as IPosts[]);
  });

  it('should be return posts', () => {
    const result = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    } as IPosts;
    expect(service.getPostsById(1)).toStrictEqual(result as IPosts);
  });

  it('should be return error if post not found', () => {
    try {
      service.getPostsById(123);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });
});
