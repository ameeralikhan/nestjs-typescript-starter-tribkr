import { Controller, Get, Param } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import * as Joi from 'joi';
import { IPosts } from '../../interfaces/posts/post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  getPosts(): IPosts[] {
    return this.postService.getPosts();
  }

  @Get(':id')
  getPostsById(
    @Param('id', new JoiPipe(Joi.number().required())) id: number, // for unit test purpose to check joi validaion
  ): IPosts {
    return this.postService.getPostsById(id);
  }
}
