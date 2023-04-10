import { Query, Resolver } from '@nestjs/graphql';
import { Website1Service } from '../../domain/website1.service';
import { Website1 } from 'src/libs/dto/website1.dto';
@Resolver()
export class wesbite1MutationsResolver {
  constructor(private website1Service: Website1Service) {}
  @Query(() => [Website1])
  async scraper(): Promise<Website1[]> {
    const data = await this.website1Service.scrape();
    return data;
  }
}
