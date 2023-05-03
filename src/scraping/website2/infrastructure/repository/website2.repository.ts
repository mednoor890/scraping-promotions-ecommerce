import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Products } from 'src/products/intrastructure/schemas/products.schema';
import * as puppeteer from 'puppeteer';
@Injectable()
export class Website2Repository {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
    private readonly configService: ConfigService,
  ) {}

  scrollAndDelay = async (page: puppeteer.Page, selector: string) => {
    const element = await page.$(selector);
    if (element) {
      const elementBox = await element.boundingBox();
      if (elementBox) {
        const viewportHeight = page.viewport().height;
        const scrollDistance = elementBox.y - viewportHeight;
        const scrollSteps = Math.ceil(scrollDistance / viewportHeight);
        const scrollDelay = 500; // Adjust the delay between scroll steps (in milliseconds)

        for (let i = 0; i < scrollSteps; i++) {
          await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
          });
          await page.waitForTimeout(scrollDelay);
        }
      }
    }
    await page.waitForTimeout(2000); // Wait for 2 seconds after scrolling
  };

  scrap = async (): Promise<Website2[]> => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const websiteUrl = this.configService.get<string>('WEBSITE2_URL');
    console.log('scraping data from :', websiteUrl, 'processing');
    await page.goto(websiteUrl);
    const parentSelector = ' #product_list .ajax_block_product';
    const endSelector = ' .media-content';
    await this.scrollAndDelay(page, endSelector);
    await page.waitForSelector(parentSelector); // Wait for the parent selector to appear;
    const products = await page.$$(parentSelector);
    const scrappedProduct = await Promise.all(
      products.map(async (product) => {
        const brandSelector = '.product-manufacturer-name';
        const nameSelector =
          '.right-block-information h5[itemprop="name"] a.product-name';
        const imageSelector = ' .product_img_link img';
        const priceSelector = '.content_price .price';
        const oldPriceSelector = '.content_price .old-price ';
        const discountSelector = '.left-block .price-percent-reduction';
        const linkSelector = 'div.product-image-container > a.product_img_link';
        const name = await product.$eval(nameSelector, (el) =>
          el.textContent.trim(),
        );
        let oldPrice;
        try {
          await product.$(oldPriceSelector);
          {
            const oldPriceContent = await product.$eval(
              oldPriceSelector,
              (el) => el.textContent.trim(),
            );
            oldPrice = parseFloat(oldPriceContent);
          }
        } catch (error) {
          oldPrice = 0;
        }
        const link = await product.$eval(linkSelector, (el) =>
          el.getAttribute('href'),
        );
        const brand = await product.$eval(brandSelector, (el) =>
          el.textContent.trim(),
        );
        const image = await product.$eval(imageSelector, (el) =>
          el.getAttribute('src'),
        );
        const price = parseFloat(
          await product.$eval(priceSelector, (el) => el.textContent.trim()),
        );
        let discount;
        try {
          const discountText = await product.$eval(discountSelector, (el) =>
            el.textContent.trim(),
          );
          discount = parseFloat(discountText);
        } catch (error) {
          discount = 0;
        }
        return {
          name,
          image,
          price,
          discount,
          link,
          price_on_discount: oldPrice,
          brand,
          website: 'pointm',
        };
      }),
    );
    await browser.close();
    await this.productModel.deleteMany({ website: 'pointm' });
    return this.productModel.create(scrappedProduct);
  };
}
