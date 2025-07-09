import { Inject, Injectable, Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ITransactionManager } from 'src/infrastructure/transaction/transaction.interface';
import { TRANSACTION_MANAGER_SERVICE } from 'src/shared/constants/inject-key';
import { UsersSeeder } from './seeds/seed-users';
import { ProvincesSeeder } from './seeds/seed-provincs';
import { DistrictsSeeder } from './seeds/seed-districts';
@Injectable()
export class SeederService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject(TRANSACTION_MANAGER_SERVICE)
    private readonly transactionManagerService: ITransactionManager,
    @Inject() private _userSeeder: UsersSeeder,
    @Inject() private _provinceSeeder: ProvincesSeeder,
    @Inject() private _districtSeeder: DistrictsSeeder
  ) { }

  async seed() {
    try {
      await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          await this._provinceSeeder.seed(manager);
          await this._districtSeeder.seed(manager);
          await this._userSeeder.seed(manager);
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
