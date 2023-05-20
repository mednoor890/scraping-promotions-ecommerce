import { Injectable } from '@nestjs/common';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Website4Repository } from '../infrastructure/repository/website4.repository';

@Injectable()
export class Website4Service {
  constructor(private website4Repository: Website4Repository) {}
  scrapingW = async (): Promise<Website2[]> => {
    const scrapped = await this.website4Repository.scrapingW();
    return scrapped;
  };
}
