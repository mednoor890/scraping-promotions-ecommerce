import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Products } from 'src/products/intrastructure/schemas/products.schema';

@Injectable()
export class Website5Repository {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
    private readonly configService: ConfigService,
  ) {}

  scrapingB = async (): Promise<Website2[]> => {
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    const websiteUrl = this.configService.get<string>('WEBSITE5_URL');
    const result = [];

    await page.goto(`${websiteUrl}?page=1`, { timeout: 1200000 });

    await page.waitForSelector('.product-miniature');

    const totalPages = await page.$$eval('.page-list li a', (links) =>
      links.reduce((total, link) => {
        const pageNumber = parseInt(link.textContent.trim());
        return isNaN(pageNumber) ? total : Math.max(total, pageNumber);
      }, 0),
    );

    for (let i = 1; i <= totalPages; i++) {
      const url = `${websiteUrl}?page=${i}`;
      await page.goto(url, { timeout: 1200000 });
      await page.waitForSelector('.js-product-miniature');

      const products = await page.$$('.js-product-miniature');

      for (const product of products) {
        const name = await product.$eval('.product-name a', (el) =>
          el.textContent.trim(),
        );
        const link = await product.$eval('.product-name a', (el) =>
          el.getAttribute('href'),
        );
        const price = await product.$eval('.price.product-price', (el) =>
          el.textContent.trim(),
        );
        const oldPrice = await product.$eval('.regular-price', (el) =>
          el.textContent.trim(),
        );
        const image = await product.$eval('.product-cover-link img', (el) =>
          el.getAttribute('src'),
        );
        const discount = await product.$eval(
          '.product-flag.discount span',
          (el) => el.textContent.trim(),
        );

        result.push({
          name,
          link,
          price: parseFloat(price),
          price_on_discount: parseFloat(oldPrice),
          image,
          discount: parseFloat(discount),
          brand: null,
          website: 'baity',
        });
      }
    }

    await browser.close();
    console.log(result);

    await this.productModel.deleteMany({ website: 'baity' });

    return this.productModel.create(result);
  };
}
