import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
import { Products } from 'src/products/intrastructure/schemas/products.schema';

@Injectable()
export class Website3Repository {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
    private readonly configService: ConfigService,
  ) {}
  scraping = async (): Promise<Website3[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const websiteUrl = this.configService.get<string>('WEBSITE3_URL');
    await page.goto(websiteUrl);
    // identify the selector of pagination
    // based on that selector make a loop to loop thrgh the existing pages
    // identify selectors of the products
    // the website does not include lazy loading of images ;
    const paginationUrls = await page.$$eval(
      'ul.page-list li:not(.spacer) a.js-search-link',
      (links) => links.map((link) => link.href),
    );
    for (const url of paginationUrls) {
      await page.goto(url);
      // i identify the parent selector of the elements to scrape
      const parentSelector = '.products .product_list.grid.gridcount';
      const elements = await page.$$(parentSelector);
      // make a promise.all that needs to return all the elements
      const data = Promise.all(
        elements.map(async (element) => {
          const nameLinkSelector =
            '.product-miniature .product-description h3 a';
          const name = element.$eval(nameLinkSelector, (el) =>
            el.textContent.trim(),
          );
          const link = element.$eval(nameLinkSelector, (el) =>
            el.getAttribute('href'),
          );
        }),
      );
      // identify the selectors of each element inside the div
      // extract the data inside each selector
      // return the result and return the promise
    }
  };
}
