import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly CategoryRepo: CategoriesRepository) {}

  async validate(userId: string, CategoryId: string) {
    const isOwner = await this.CategoryRepo.findFirst({
      where: { id: CategoryId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found.');
    }
  }
}
