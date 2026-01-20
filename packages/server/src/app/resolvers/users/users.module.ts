import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { UsersService } from './service';
import { UsersResolver } from './resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersResolver],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
