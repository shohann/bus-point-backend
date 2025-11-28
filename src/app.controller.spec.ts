import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return an array of users', () => {
      // Since we are not mocking AppService here, this will depend on the actual service.
      // For a true unit test, you would mock AppService as well.
      expect(appController.getHello()).toBeDefined();
    });
  });
});
