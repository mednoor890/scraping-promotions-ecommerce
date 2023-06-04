import { Injectable } from '@nestjs/common';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Website5Repository } from '../infrastructure/repository/website5.repository';

@Injectable()
export class Website5Service {
  constructor(private website5Repository: Website5Repository) {}
  scrapingB = async (): Promise<Website2[]> => {
    const scrapped = await this.website5Repository.scrapingB();
    return scrapped;
  };
}
