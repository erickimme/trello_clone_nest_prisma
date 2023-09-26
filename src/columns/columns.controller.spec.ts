import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UsersModule } from '../users/users.module';

describe('ColumnsController', () => {
  let controller: ColumnsController;
  let service: ColumnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [ColumnsController],
      providers: [
        {
          provide: ColumnsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ColumnsController>(ColumnsController);
    service = module.get<ColumnsService>(ColumnsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // *TODO: 컬럼 생성 테스트 코드 작성
  describe('create', () => {
    it('컬럼을 생성하고 반환한다', async () => {
      // Req 객체를 모킹합니다.
      const mockReq = {
        user: {
          userId: 1,
        },
      };

      const createColumnDto: CreateColumnDto = {
        name: '새 컬럼',
        order: 1,
        boardId: 1,
        createdAt: undefined,
        updatedAt: undefined,
      };
      const result = {
        columnId: 1,
        name: '새 컬럼',
        order: 1,
        BoardId: 1,
        CreatorId: 1,
      };
      // 서비스의 create 메서드를 모킹합니다.
      (service.create as jest.Mock).mockResolvedValue(result);

      // controller의 create 메서드를 호출하고 결과를 확인합니다.
      expect(await controller.create(mockReq as any, createColumnDto)).toEqual(
        result,
      );
    });
  });

  describe('findAll', () => {
    it('모든 컬럼을 반환한다', async () => {
      const result = [
        {
          columnId: 1,
          name: '컬럼1',
          order: 1,
          BoardId: 1,
          CreatorId: 1,
        },
        {
          columnId: 2,
          name: '컬럼2',
          order: 2,
          BoardId: 1,
          CreatorId: 1,
        },
      ];

      (service.findAll as jest.Mock).mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  // findOne, update, remove 등의 테스트도 이어서 작성할 수 있습니다.
  describe('findOne', () => {
    it('컬럼을 반환한다', async () => {
      const result = {
        columnId: 1,
        name: '컬럼1',
        order: 1,
        BoardId: 1,
        CreatorId: 1,
      };

      (service.findOne as jest.Mock).mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
    });
  });

  describe('update', () => {
    it('컬럼을 수정한다', async () => {
      const result = {
        columnId: 1,
        name: '컬럼1',
        order: 1,
        BoardId: 1,
        CreatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updateColumnDto: CreateColumnDto = {
        name: '새 컬럼',
        order: 1,
        boardId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (service.update as jest.Mock).mockResolvedValue(result);

      expect(await controller.update(1, result)).toEqual(result);
    });
  });

  describe ('remove', () => {
    it('컬럼을 삭제한다', async () => {
      const result = {
        columnId: 1,
        name: '컬럼1',
        order: 1,
        BoardId: 1,
        CreatorId: 1,
      };

      (service.remove as jest.Mock).mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(result);
    });
  });
});
