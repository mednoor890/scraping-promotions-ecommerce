import { Resolver, Query } from '@nestjs/graphql';
import { Website3Service } from '../../domain/website3.service';
import { Website2 } from 'src/libs/dto/website2.dto';
@Resolver()
export class website3QueriesResolver {
  constructor(private website3Service: Website3Service) {}
  @Query(() => [Website2])
  async scraping(): Promise<Website2[]> {
    const data = await this.website3Service.scraping();
    return data;
  }
}
