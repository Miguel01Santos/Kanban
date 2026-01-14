import { Module } from '@nestjs/common';
import { UserResolver } from '../users';

@Module({
  imports: [],
  providers: [UserResolver],
  exports: [UserResolver],
})
export class CommonModule {}
