import { Injectable } from '@nestjs/common';
import DatabaseService from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly db: DatabaseService) {}

  async getHello(): Promise<any> {
    // await this.db.user.createMany({
    //   data: [{ name: 'dsf', email: 'dhwsdh' }],
    // });

    return await this.db.user.findMany();
  }
}
