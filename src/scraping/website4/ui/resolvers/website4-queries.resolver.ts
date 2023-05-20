import { Resolver, Query } from '@nestjs/graphql';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Website4Service } from '../../domain/website4.service';
@Resolver()
export class website4QueriesResolver {
  constructor(private website4Service: Website4Service) {}
  @Query(() => [Website2])
  async scrapingW(): Promise<Website2[]> {
    const data = await this.website4Service.scrapingW();
    return data;
  }
}
