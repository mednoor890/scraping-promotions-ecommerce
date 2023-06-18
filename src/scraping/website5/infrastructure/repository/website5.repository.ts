/* eslint-disable prettier/prettier */
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

      const productElements = await page.$$('.js-product-miniature');

      for (const productElement of productElements) {
        try {
          const nameElement = await productElement.$('.product-container .product-name a');
          const name = await nameElement.evaluate((el) => el.textContent.trim());

          const linkElement = await productElement.$('.product-container .product-name a');
          const link = await linkElement.evaluate((el) => el.getAttribute('href'));

          const priceElement = await productElement.$('.price.product-price');
          const price = await priceElement.evaluate((el) => parseFloat(el.textContent.trim().replace(/[^\d.]/g, '')));

          const oldPriceElement = await productElement.$('.regular-price');
          const oldPrice = await oldPriceElement.evaluate((el) => parseFloat(el.textContent.trim().replace(/[^\d.]/g, '')));

          const imageElement = await productElement.$('.product-cover-link img');
          const image = await imageElement.evaluate((el) => el.getAttribute('src'));

          const discount = Math.round(-100 * ((oldPrice - price) / oldPrice));

          result.push({
            name,
            link,
            price,
            price_on_discount: oldPrice,
            image,
            discount,
            brand: null,
            website: 'baity',
          });
        } catch (error) {
          console.error('Failed to extract product data:', error);
        }
      }
    }

    await browser.close();
    console.log(result);

    await this.productModel.deleteMany({ website: 'baity' });

    return this.productModel.create(result);
  };
}
