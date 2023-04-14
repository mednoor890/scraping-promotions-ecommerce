import { Query, Resolver } from '@nestjs/graphql';
import { Website1Service } from '../../domain/website1.service';
import { Website1 } from 'src/libs/dto/website1.dto';
import { Cron } from '@nestjs/schedule';
@Resolver()
export class wesbite1MutationsResolver {
  constructor(private website1Service: Website1Service) {}
  @Cron('0 8 * * 3')
  @Query(() => [Website1])
  async scraper(): Promise<Website1[]> {
    console.log('Cron job started.');
    const data = await this.website1Service.scrape();
    console.log('Cron job finished.');
    return data;
  }
  @Query(() => [Website1])
  async getScrappedProducts(): Promise<Website1[]> {
    return await this.website1Service.getScrappedProducts();
  }
}
