import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpikeService {
  private readonly apiKey = process.env.OPENROUTE_API_KEY;
  private readonly baseUrl = 'https://api.openrouteservice.org/v2/';

  async getRuta() {

    //Geocoding

    const address = "Carrer de Sant Miquel, 61, 12130 Sant Joan de Moró, Castelló";
    const geocodingUrl = 'https://api.openrouteservice.org/geocode/search';
    try {
      const prueba = await axios.get(`http://spike-production.up.railway.app`);
      console.log(prueba);
    }
    catch(error){
      console.error(`Error al acceder la dirección del spike: ${error.message}`);
    }

    try {
      const geocodingResponse = await axios.get(geocodingUrl, {
        params: {
            api_key: this.apiKey,
            text: address,
        },
      });
      console.log('Resultado de geocodificación:');
      console.log(geocodingResponse.data.bbox);
    } catch (error) {
      console.error(`Error al geocodificar la dirección: ${error.message}`);
    }
    
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
    const instructions = directionsResponse.data.features[0].properties.segments[0].steps;
    const coords = directionsResponse.data.features[0].geometry.coordinates;

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
      const response = await axios.get(urlFuelAll);
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

