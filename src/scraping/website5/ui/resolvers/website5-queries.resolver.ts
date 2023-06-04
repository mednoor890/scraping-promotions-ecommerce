import { Resolver, Query } from '@nestjs/graphql';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Website5Service } from '../../domain/website5.service';
@Resolver()
export class website5QueriesResolver {
  constructor(private website5Service: Website5Service) {}
  @Query(() => [Website2])
  async scrapingB(): Promise<Website2[]> {
    const data = await this.website5Service.scrapingB();
    return data;
  }
}
