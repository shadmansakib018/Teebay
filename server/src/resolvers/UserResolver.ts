import { User } from '../entity/User';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import * as argon2 from 'argon2';

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async AllUser(@Ctx() ctx: any) {
    return await ctx.userRepo.find({
      relations: {
        postsWritten: true,
      },
    });
  }

  @Mutation(() => UserResponse)
  async AddUser(
    @Arg('firstName') fn: string,
    @Arg('lastName') ln: string,
    @Arg('username') un: string,
    @Arg('password') ps: string,
    @Ctx() ctx: any
  ): Promise<UserResponse> {

    const userExists = await ctx.userRepo.findOne({ where : {username : un}});
    if(userExists){
        return {
            errors: [
              {
                field: 'username',
                message: 'username already taken',
              },
            ],
          };
    }
    const user = new User();
    const hash = await argon2.hash(ps);
    user.firstName = fn;
    user.lastName = ln;
    user.username = un;
    user.password = hash;
    const newUser = await user.save();
    return {user: newUser}
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg('username') un: string,
    @Arg('password') ps: string,
    @Ctx() ctx: any
  ): Promise<UserResponse> {
    const user = await ctx.userRepo.findOne({ where : {username : un}});
    console.log(user)
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, ps);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }
    return {
        user,
      };
  }

  @Mutation(() => Boolean)
  async deleteAllUsers(@Ctx() ctx: any): Promise<boolean> {
    const res: any = await ctx.userRepo.delete({});
    console.log(res);
    return true;
  }
}
