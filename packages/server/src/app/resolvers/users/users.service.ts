import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const result = await queryBuilder
      .select('*')
      .where('id = :id', { id })
      .getOne();

    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }

  async create(userData: Partial<User>): Promise<User> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (!userData.password) {
      throw new Error('Password is required');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const result = await queryBuilder
      .insert()
      .into(User)
      .values({
        ...userData,
        password: hashedPassword,
      })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return result.raw[0] as User;
  }

  async update(id: number, userData: User): Promise<User> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const result = await queryBuilder
      .update(User)
      .set(userData)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return result.raw[0] as User;
  }

  async delete(id: number): Promise<void> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    await queryBuilder.delete().where('id = :id', { id }).execute();
  }
}
