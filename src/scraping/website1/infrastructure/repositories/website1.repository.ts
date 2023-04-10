import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from 'src/products/intrastructure/schemas/products.schema';
import * as puppeteer from 'puppeteer';
import { Website1 } from 'src/libs/dto/website1.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class Website1Repository {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
    private readonly configService: ConfigService,
  ) {}
  scrape = async (): Promise<Website1[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const siteUrl = this.configService.get<string>('WEBSITE1_URL');
    console.log('Site URL:', siteUrl);
    await page.goto(siteUrl, { timeout: 60000 });
    const parentSelector =
      '.arrival .non-alimentaire .product-item, .arrival .alimentaire .product-item';
    /*const parentSelectorV =
      '.v-arrival .non-alimentaire .product-item, .v-arrival .alimentaire .product-item';*/

    const products = await page.$$(parentSelector);
    const scrappedProducts = await Promise.all(
      products.map(async (product) => {
        const nameSelector = '.product-name ';
        const priceSelector = '.price';
        const imageSelector = '.product-image-photo';
        const discountSelector = '.decro';
        const linkSelector = 'a.product-item-photo';
        const name = await product.$eval(nameSelector, (el) =>
          el.textContent.trim(),
        );
        const image = await product.$eval(imageSelector, (el) =>
          el.getAttribute('src'),
        );
        const price = parseFloat(
          await product.$eval(priceSelector, (el) =>
            el.textContent.trim().replace(',', '.'),
          ),
        );
        let link;
        try {
          link = await product.$eval(linkSelector, (el) =>
            el.getAttribute('href'),
          );
        } catch (error) {
          link = '';
        }
        let discount;
        try {
          discount = parseFloat(
            await product.$eval(discountSelector, (el) =>
              el.textContent.trim().replace(',', '.'),
            ),
          );
        } catch (error) {
          discount = 0;
        }

        return {
          name,
          image,
          price,
          discount,
          link,
        };
      }),
    );
    await browser.close();
    // return scrappedProducts;
    return this.productModel.create(scrappedProducts);
  };
}
