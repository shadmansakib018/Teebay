import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { AppDataSource } from '../data-source';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async AllPost(@Ctx() ctx: any) {
    return await ctx.postRepo.find({
      relations: {
        creator: true,
      },
    });
  }

  @Mutation(() => Post || Boolean)
  async AddPost(
    @Arg('title') tt: string,
    @Arg('category') ct: string,
    @Arg('description') ds: string,
    @Arg('price') pr: number,
    @Arg('rentPrice') rp: number,
    @Arg('rentType') rt: string,
    @Arg('username') CID: string,
    @Ctx() ctx: any
  ): Promise<Post | boolean> {
    const user = await ctx.userRepo.findOne({where:{ username: CID }});
    console.log(user)
    if (user) {
      const newPost = await Post.create({
        title: tt,
        category: ct,
        description: ds,
        price: pr,
        rentPrice: rp,
        rentType: rt,
        creator: user,
      }).save();
      return newPost;
    }
    return false;
  }

  @Query(()=>User)
  async PostOfOneUser(
    @Ctx() ctx: any,
    @Arg('username') un : string
  ){
    const user = await ctx.userRepo.findOne({ where : {username : un}, relations: {
      postsWritten: true,
    },});
    console.log('postofoneuser', user)
    return user;
  }

  @Mutation(() => Boolean)
  async deleteAllPosts(@Ctx() ctx: any): Promise<boolean> {
    const res: any = await ctx.postRepo.delete({});
    console.log(res);
    return true;
  }
}
