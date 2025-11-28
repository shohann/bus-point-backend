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
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: DatabaseService, useValue: mockDbService },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return multiple users and call findMany exactly once', async () => {
      const mockUsers = [
        { id: 1, name: 'Alpha', email: 'a@example.com' },
        { id: 2, name: 'Beta', email: 'b@example.com' },
      ];

      mockDbService.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.getHello();

      expect(result).toEqual(mockUsers);
      expect(mockDbService.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should call findMany with no filters (empty args)', async () => {
      mockDbService.user.findMany.mockResolvedValue([]);

      await service.getHello();

      // Prisma's findMany should be called with no params
      expect(mockDbService.user.findMany).toHaveBeenCalledWith();
    });

    it('should handle the case where no users exist', async () => {
      mockDbService.user.findMany.mockResolvedValue([]);

      const result = await service.getHello();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should throw an error if database call fails', async () => {
      mockDbService.user.findMany.mockRejectedValue(
        new Error('Database connection lost'),
      );

      await expect(service.getHello()).rejects.toThrow(
        'Database connection lost',
      );
      expect(mockDbService.user.findMany).toHaveBeenCalled();
    });

    it('should not swallow or modify the thrown error', async () => {
      const dbError = new Error('Prisma failure');

      mockDbService.user.findMany.mockRejectedValue(dbError);

      // Must throw EXACT error instance
      await expect(service.getHello()).rejects.toBe(dbError);
    });
  });
});
