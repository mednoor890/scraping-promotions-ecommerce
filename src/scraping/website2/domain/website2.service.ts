import { Injectable } from '@nestjs/common';
import { Website2Repository } from '../infrastructure/repository/website2.repository';
import { Website2 } from 'src/libs/dto/website2.dto';

@Injectable()
export class Website2Service {
  constructor(private website2Repository: Website2Repository) {}
  scrap = async (): Promise<Website2[]> => {
    const scrapped = await this.website2Repository.scrap();
    return scrapped;
  };
  /*getScrappedProducts = async (): Promise<Website1[]> => {
    return await this.website2Repository.getScrappedProducts();
  };*/
}
