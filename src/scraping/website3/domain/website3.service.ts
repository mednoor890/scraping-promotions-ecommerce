import { Injectable } from '@nestjs/common';
import { Website3Repository } from '../infrastructure/website3.repository';

@Injectable()
export class Website3Service {
  constructor(private website3Repository: Website3Repository) {}
  scraping = async (): Promise<Website3[]> => {
    const scrapped = await this.website3Repository.scraping();
    return scrapped;
  };
}
