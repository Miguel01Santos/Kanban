import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  helloUser() {
    return 'Olá do User Resolver!';
  }
}
