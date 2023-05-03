import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductsModule } from './products/ui';
import { CategoryModule } from './category/ui';
import { UserModule } from './users/ui';
import { CustomersModule } from './customers/ui';
import { Website1Module } from './scraping/website1/ui';
import { ScheduleModule } from '@nestjs/schedule';
import { Website2Module } from './scraping/website2/ui';
import { Website3Module } from './scraping/website3/ui';
import { Website4Module } from './scraping/website4/ui';
@Global()
@Module({
  imports: [
    CustomersModule,
    CategoryModule,
    ProductsModule,
    UserModule,
    Website1Module,
    Website2Module,
    Website3Module,
    Website4Module,
    ScheduleModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
