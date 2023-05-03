import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
//import { Website2 } from 'src/libs/dto/website2.dto';
import { Products } from 'src/products/intrastructure/schemas/products.schema';

@Injectable()
export class Website4Repository {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
    private readonly configService: ConfigService,
  ) {}
  scrapingW = async (): Promise<string> => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = this.configService.get<string>('WEBSITE4_URL');
    await page.goto(url);
    await page.click('#pagination_bottom .showall button');
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    return currentUrl;
  };
}
