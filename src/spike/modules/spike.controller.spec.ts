import { Test, TestingModule } from '@nestjs/testing';
import { SpikeController } from './spike.controller';
import { SpikeService } from './spike.service';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter'; 


describe('SpikeController', () => {
  let controller: SpikeController;
  let mockService: SpikeService;
  let axiosMock: AxiosMockAdapter;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpikeController],
      providers: [SpikeService],
    }).compile();

    controller = module.get<SpikeController>(SpikeController);
    mockService = module.get<SpikeService>(SpikeService);
    axiosMock = new AxiosMockAdapter(axios);
  });

  afterAll(() => {
    axiosMock.restore();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get ruta from service', async () => {
    const rutaData = {
      totalDistance: 100,
      instructions: ['Turn left', 'Turn right'],
      coords: [[0, 0], [1, 1]],
    };
    jest.spyOn(mockService, 'getRuta').mockResolvedValue(rutaData);

    const result = await controller.getRuta();

    expect(result).toBe(rutaData);
  });

});


describe('SpikeService', () => {
  let service: SpikeService;
  let axiosMock: AxiosMockAdapter;

  beforeAll(() => {
    service = new SpikeService();
    axiosMock = new AxiosMockAdapter(axios);
  });

  afterAll(() => {
    axiosMock.restore();
  });

  it('should get ruta', async () => {
    const mockResponse = {
      data: {
        totalDistance: 100,
        instructions: ['Turn left', 'Turn right'],
        coords: [[0, 0], [1, 1]],
      },
    };
    axiosMock.onGet('https://api.openrouteservice.org/geocode/search').reply(200, {});
    axiosMock.onGet('https://api.openrouteservice.org/v2/directions/driving-car').reply(200, mockResponse);

    const result = await service.getRuta();

    expect(result).toEqual(mockResponse);
  });

});