import api, { Api } from '../apiService';
import config from'../../config/apiConfig';
import axios from 'axios';

jest.mock('axios');

const cities = [{ country_code: 'UKR', name : 'Kharkiv', code: 'KH' }];
const prices = {'2021-05-13':{
  airline: "RR",
  departure_at: "2021-05-13T18:00:00Z",
  destination: "PAR",
  expires_at: "2021-02-13T08:02:56Z",
  flight_number: 9234,
  origin: "IEV",
  price: 139,
  return_at: "2021-07-03T20:05:00Z",
  transfers: 1
  }
};
describe('Test API Service', () => {
  it ('Success fetch cities', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: cities}));
    await expect(api.cities()).resolves.toEqual(cities);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`);
  });
  it ('Fetch cities failure', async () => {
    const errorMsg = 'Api Error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMsg)));
    await expect(api.cities()).rejects.toThrow(errorMsg);
  });

  it ('Succcess fetch prices', async () => {
    const params = {origin: "IEV", destination: "PAR", depart_date: "2021-02", return_date: "2021-07", currency: "USD"};
    axios.get.mockImplementationOnce(() => Promise.resolve({data: prices}));
    await expect(api.prices(params)).resolves.toEqual(prices);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/prices/cheap`,  {params});
  });
})


/*origin: "IEV", destination: "PAR", depart_date: "2021-02", return_date: "2021-07", currency: "USD"*/