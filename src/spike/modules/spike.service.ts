import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpikeService {
  private readonly apiKey = '5b3ce3597851110001cf62482f02da5ed6794ccc8c6774ab019ffc8d';
  private readonly baseUrl = 'https://api.openrouteservice.org/v2/';

  async getRuta() {

    //Geocoding

    /*const address = 'Carrer de Sant Miquel, 61, 12130 Sant Joan de Moró, Castelló';
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
    }*/
    
    //Routes

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
      
    const totalDistance = directionsResponse.data.features[0].properties.segments[0].distance;
    console.log('Distancia: ' + totalDistance)

    const instructions = directionsResponse.data.features[0].properties.segments[0].steps;
    instructions.forEach((instruction, index) => {
      console.log('Instrucción ${index + 1}:', instruction);
    });
    const coords = directionsResponse.data.features[0].geometry.coordinates;
    console.log('Coordenadas: '+coords);
      return {totalDistance, instructions, coords};
    } catch (error) {
      throw new Error(`Error fetching data from OpenRouteService: ${error.message}`);
    }    
  }
  async getCarburante(){
    const urlFuelAll = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres';
    const urlFuelCS = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/12'
    const urlCA = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/';
    try {
      const response = await axios.get(urlFuelCS);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching fuel prices: ${error.message}`);
    }
  }
  async getLuz(){
    const baseUrlLuz = 'https://api.preciodelaluz.org/v1/prices/all?zone=PCB';
    
    try {
      const response = await axios.get(baseUrlLuz);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching electricity prices: ${error.message}`);
    }
  }
}

