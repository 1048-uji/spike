import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpikeService {
  private readonly apiKey = '5b3ce3597851110001cf62482f02da5ed6794ccc8c6774ab019ffc8d';
  private readonly baseUrl = 'https://api.openrouteservice.org/v2/';

  async getSpike() {
    const address = 'Castelló';
    const geocodingUrl = `https://api.openrouteservice.org/geocode/search?api_key=${this.apiKey}&text=${address}`;
    try {
      const geocodingResponse = await axios.get(geocodingUrl);
      console.log('Resultado de geocodificación:');
      console.log(geocodingResponse.data);
    } catch (error) {
      console.error(`Error al geocodificar la dirección: ${error.message}`);
    }

    const coordinates = ['39.992270,-0.068564', '39.479277,-0.341976'];
    const directionsUrl = `${this.baseUrl}directions/driving-car`;

    try {
      const directionsResponse = await axios.get(directionsUrl, {
        params: {
          api_key: this.apiKey,
          coordinates: coordinates,
        },
      });

      console.log('Resultado de obtención de direcciones:');
      console.log(directionsResponse.data);
      return directionsResponse.data;
    } catch (error) {
      throw new Error(`Error fetching data from OpenRouteService: ${error.message}`);
    }
  }
}

