import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/app/entities/boards.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(boardData: Partial<Board>, userId: string): Promise<Board> {
    const queryBuilder = this.boardRepository.createQueryBuilder('board');

    const result = await queryBuilder
      .insert()
      .into(Board)
      .values({
        ...boardData,
        userId: userId,
      })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return result.raw[0] as Board;
  }

  async update(
    id: string,
    boardData: Partial<Board>,
    userId: string,
  ): Promise<Board> {
    const queryBuilder = this.boardRepository.createQueryBuilder('board');

    const result = await queryBuilder
      .update(Board)
      .set(boardData)
      .where('id = :id AND userId = :userId', { id, userId })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const updatedBoard = result.raw[0] as Board;

    if (!updatedBoard) {
      throw new NotFoundException('Board not found or unauthorized');
    }

    return updatedBoard;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const queryBuilder = this.boardRepository.createQueryBuilder('board');

    const result = await queryBuilder
      .delete()
      .from(Board)
      .where('id = :id AND userId = :userId', { id, userId })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException('Board not found or unauthorized');
    }

    return true;
  }

  async findAllByUser(userId: string): Promise<Board[]> {
    const queryBuilder = this.boardRepository.createQueryBuilder('board');

    return await queryBuilder
      .where('board.userId = :userId', { userId })
      .getMany();
  }
}
