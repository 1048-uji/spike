import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpikeService {
  private readonly apiKey = '5b3ce3597851110001cf62482f02da5ed6794ccc8c6774ab019ffc8d';
  private readonly baseUrl = 'https://api.openrouteservice.org/v2/';

  async getSpike() {

    const address = 'Carrer de Sant Miquel, 61, 12130 Sant Joan de Moró, Castelló';
    const geocodingUrl = this.baseUrl+'geocode/search';
    
    try {
      const geocodingResponse = await axios.get(geocodingUrl, {
        params: {
            api_key: this.apiKey,
            text: address,
        },
      });
      console.log('Resultado de geocodificación:');
      console.log(geocodingResponse.data);
    } catch (error) {
      console.error(`Error al geocodificar la dirección: ${error.message}`);
    }
    
    const start = '-0.068564,39.992270';
    const end = '-0.341976,39.479277';
    const directionsUrl = this.baseUrl+'directions/driving-car';

    try {
      const directionsResponse = await axios.get(directionsUrl, {
        params: {
          api_key: this.apiKey,
          start: start,
          end: end,
        },
      });
      
      return directionsResponse.data;
    } catch (error) {
      throw new Error(`Error fetching data from OpenRouteService: ${error.message}`);
    }
  }
}

