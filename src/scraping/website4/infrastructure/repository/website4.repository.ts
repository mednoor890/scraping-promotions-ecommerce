import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
import { Website2 } from 'src/libs/dto/website2.dto';
import { Products } from 'src/products/intrastructure/schemas/products.schema';

@Injectable()
export class Website4Repository {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
    private readonly configService: ConfigService,
  ) {}

  scrapingW = async (): Promise<Website2[]> => {
    const scrappedProduct = [];
    try {
      const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
      });
      const page = await browser.newPage();
      const url = this.configService.get<string>('WEBSITE4_URL');
      await page.goto(url, { timeout: 1200000 });
      await page.click('#pagination_bottom .showall button');
      await page.waitForSelector('.product-container.product-block');
      const products = await page.$$('.product-container.product-block');
      const brandSelector = ' .logo_marque img';
      const nameSelector = '.name a.product-name';
      const imageSelector = '.image img';
      const priceSelector = '.content_price .price';
      const oldPriceSelector = '.content_price .old-price';
      const descriptionSelector = '.product-desc .desc_list';
      const linkSelector = '.product_img_link';

      const productPromises = products.map(async (product) => {
        try {
          const brandElement = await product.$(brandSelector);
          if (!brandElement) {
            throw new Error(
              `Failed to find element matching selector: ${brandSelector}`,
            );
          }
          const brand = await brandElement.evaluate((el) =>
            el.getAttribute('src'),
          );

          const nameElement = await product.$(nameSelector);
          if (!nameElement) {
            throw new Error(
              `Failed to find element matching selector: ${nameSelector}`,
            );
          }
          const name = await nameElement.evaluate((el) =>
            el.textContent.trim(),
          );

          const imageElement = await product.$(imageSelector);
          if (!imageElement) {
            throw new Error(
              `Failed to find element matching selector: ${imageSelector}`,
            );
          }
          const image = await imageElement.evaluate((el) =>
            el.getAttribute('src'),
          );

          const priceElement = await product.$(priceSelector);
          if (!priceElement) {
            throw new Error(
              `Failed to find element matching selector: ${priceSelector}`,
            );
          }
          const priceText = await priceElement.evaluate((el) =>
            el.textContent.trim(),
          );
          const price = parseFloat(
            priceText.replace(/\s/g, '').replace(',', '.'),
          );

          const oldPriceElement = await product.$(oldPriceSelector);
          let oldPrice = null;
          if (oldPriceElement) {
            const oldPriceText = await oldPriceElement.evaluate((el) =>
              el.textContent.trim(),
            );
            oldPrice = parseFloat(
              oldPriceText.replace(/\s/g, '').replace(',', '.'),
            );
          }

          const descriptionElement = await product.$(descriptionSelector);
          let description = '';
          if (descriptionElement) {
            description = await descriptionElement.evaluate((el) =>
              el.textContent.trim(),
            );
          }

          const linkElement = await product.$(linkSelector);
          if (!linkElement) {
            throw new Error(
              `Failed to find element matching selector: ${linkSelector}`,
            );
          }
          const link = await linkElement.evaluate((el) =>
            el.getAttribute('href'),
          );

          scrappedProduct.push({
            brand,
            name,
            image,
            price,
            price_on_discount: oldPrice,
            description,
            website: 'wiki',
            link,
            discount: Math.round(100 * ((price - oldPrice) / price)),
          });
        } catch (error) {
          console.error('Error scraping product:', error);
        }
      });

      await Promise.all(productPromises);

      // Close the browser
      await browser.close();

      // Delete existing products from the database
      await this.productModel.deleteMany({ website: 'wiki' });

      // Save the scraped products to the database
      return this.productModel.create(
        scrappedProduct.filter((product) => product !== null),
      );
    } catch (error) {
      console.error('Error scraping website:', error);
      return error as any; // Return an empty array if an error occurs during scraping
    }
  };
}
