import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [UsersModule, BoardsModule],
  providers: [],
  exports: [UsersModule, BoardsModule],
})
export class CommonModule {}
