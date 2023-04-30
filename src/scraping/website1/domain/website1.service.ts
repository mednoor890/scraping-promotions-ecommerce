import { Injectable } from '@nestjs/common';
import { Website1Repository } from '../infrastructure/repository/website1.repository';
import { Website1 } from 'src/libs/dto/website1.dto';

@Injectable()
export class Website1Service {
  constructor(private website1Repository: Website1Repository) {}
  scrape = async (): Promise<Website1[]> => {
    const scrapped = await this.website1Repository.scrape();
    return scrapped;
  };
  getScrappedProducts = async (): Promise<Website1[]> => {
    return await this.website1Repository.getScrappedProducts();
  };
}
