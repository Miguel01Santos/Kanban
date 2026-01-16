import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersController {
  @Query(() => String)
  helloUser() {
    return 'Olá do User Resolver!';
  }
}
