import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import DatabaseService from './database/database.service';

// Mock the DatabaseService at the top level.
// This prevents Jest from trying to resolve the actual file and its problematic imports.
jest.mock('./database/database.service');

describe('AppService', () => {
  let service: AppService;

  const mockDbService = {
    user: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: DatabaseService,
          useValue: mockDbService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return an array of users by calling db.user.findMany', async () => {
      const mockUsers = [
        { id: 1, name: 'Test User', email: 'test@example.com' },
      ];
      mockDbService.user.findMany.mockResolvedValue(mockUsers);

      await expect(service.getHello()).resolves.toEqual(mockUsers);
      expect(mockDbService.user.findMany).toHaveBeenCalled();
    });
  });
});
