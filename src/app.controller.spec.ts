import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // Provide a mock for AppService
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockResolvedValue([]), // Mock the method used by controller
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return an array of users', async () => {
      // Act
      const result = await appController.getHello();

      // Assert
      expect(result).toEqual([]);
      expect(appService.getHello).toHaveBeenCalled();
    });
  });
});
