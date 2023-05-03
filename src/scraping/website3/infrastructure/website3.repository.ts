import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as puppeteer from 'puppeteer';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Products } from 'src/products/intrastructure/schemas/products.schema';

@Injectable()
export class Website3Repository {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
    private readonly configService: ConfigService,
  ) {}
  scraping = async (): Promise<Website2[]> => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const websiteUrl = this.configService.get<string>('WEBSITE3_URL');
    const result = [];
    const initialPageUrl = `${websiteUrl}?page=1`;
    await page.goto(initialPageUrl);
    await page.waitForSelector('.product_item');

    // Get the total number of pages from the pagination div
    const totalPages = await page.$$eval('.page-list li a', (links) =>
      links.reduce((total, link) => {
        const pageNumber = parseInt(link.textContent.trim());
        return isNaN(pageNumber) ? total : Math.max(total, pageNumber);
      }, 0),
    );

    for (let i = 1; i <= totalPages; i++) {
      const url = `${websiteUrl}?page=${i}`;
      await page.goto(url);

      await page.waitForSelector('.product_item');

      const products = await page.$$('.product_item');

      for (const product of products) {
        const name = await product.$eval('.product-description h3 a', (el) =>
          el.textContent.trim(),
        );
        const link = await product.$eval('.product-description h3 a', (el) =>
          el.getAttribute('href'),
        );
        const price = await product.$eval(
          '.product-price-and-shipping .price',
          (el) => el.textContent.trim(),
        );
        const oldPrice = await product.$eval(
          '.product-price-and-shipping .regular-price',
          (el) => el.textContent.trim(),
        );
        const image = await product.$eval(
          '.thumbnail-container .thumbnail img',
          (el) => el.getAttribute('src'),
        );
        const discount = await product.$eval('.product-flags .on-sale', (el) =>
          el.textContent.trim(),
        );

        result.push({
          name,
          link,
          price: parseFloat(price),
          price_on_discount: parseFloat(oldPrice),
          image,
          discount: parseFloat(discount),
          brand: null,
          website: 'exist',
        });
      }
    }
    await browser.close();
    console.log(result);
    await this.productModel.deleteMany({ website: 'exist' });
    return this.productModel.create(result);
  };
}
