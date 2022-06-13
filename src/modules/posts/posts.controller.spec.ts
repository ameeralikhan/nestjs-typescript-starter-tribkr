import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IPosts } from '../../interfaces/posts/post.interface';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return posts array', () => {
    const result = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
    ] as IPosts[];
    jest.spyOn(service, 'getPosts').mockImplementation(() => result);

    expect(controller.getPosts()).toBe(result);
  });

  it('should be return post', () => {
    const result = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    } as IPosts;
    jest.spyOn(service, 'getPostsById').mockImplementation(() => result);

    expect(controller.getPostsById(1)).toBe(result as IPosts);
  });

  it('should be error if post not found', () => {
    try {
      controller.getPostsById(123);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });
});
