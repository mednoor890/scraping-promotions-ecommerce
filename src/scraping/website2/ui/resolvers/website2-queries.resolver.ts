import { Query, Resolver } from '@nestjs/graphql';
import { Website2Service } from '../../domain/website2.service';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Cron } from '@nestjs/schedule';

@Resolver()
export class wesbite2QueriesResolver {
  constructor(private website2Service: Website2Service) {}
  @Cron('0 16 * * 1')
  @Query(() => [Website2])
  async scrap(): Promise<Website2[]> {
    const data = await this.website2Service.scrap();
    return data;
  }
  /*@Query(() => [Website1])
  async getScrappedProducts(): Promise<Website1[]> {
    return await this.website2Service.getScrappedProducts();
  }*/
}
