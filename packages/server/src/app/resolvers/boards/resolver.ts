import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BoardsService } from './service';
import { Board } from 'src/app/entities/boards.entity';
import { User } from 'src/app/entities/users.entity';
import { Query, Req } from '@nestjs/common';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Mutation(() => Board)
  async createBoard(
    @Args('board') boardData: Partial<Board>,
    @Req() req: { user: User },
  ): Promise<Board> {
    return this.boardsService.create(boardData, req.user.id);
  }

  @Mutation(() => Board)
  async updateBoard(
    @Args('id') id: string,
    @Args('boardData') boardData: Partial<Board>,
    @Req() req: { user: User },
  ): Promise<Board> {
    return this.boardsService.update(id, boardData, req.user.id);
  }

  @Mutation(() => Boolean)
  async deleteBoard(
    @Args('id') id: string,
    @Req() req: { user: User },
  ): Promise<boolean> {
    return this.boardsService.delete(id, req.user.id);
  }

  async findAllByUser(@Query('userId') userId: string): Promise<Board[]> {
    return this.boardsService.findAllByUser(userId);
  }
}
