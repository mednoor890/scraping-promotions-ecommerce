import { Resolver, Query } from '@nestjs/graphql';
import { Website3Service } from '../../domain/website3.service';
@Resolver()
export class website3QueriesResolver {
  constructor(private website3Service: Website3Service) {}
  @Query(() => [Website3])
  async scraping(): Promise<Website3[]> {
    const data = await this.website3Service.scraping();
    return data;
  }
}
