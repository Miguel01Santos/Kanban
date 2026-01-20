import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/app/entities/users.entity';
import { UsersService } from './service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  async getUserById(@Args('id', { type: () => ID }) id: string) {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: User) {
    return await this.usersService.create(user);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('user') user: User,
  ) {
    return await this.usersService.update(id, user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    return await this.usersService.delete(id);
  }
}
