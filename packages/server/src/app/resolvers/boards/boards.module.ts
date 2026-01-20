import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/app/entities/boards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [],
  providers: [],
  exports: [],
})
export class BoardsModule {}
