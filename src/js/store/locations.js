import api from '../services/apiService';
import { formatDate } from '../helpers/date';
import currencyUI from '../views/currency';
class Locations {
    constructor (api, helpers, currency) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.airlines = null;
        this.lastSearch = null;
        this.formatDate = helpers.formatDate;
        this.currency = currency;
    }

    async init() {
        const [countries, cities, airlines] = await this.getResponse();

        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);
    }

    async getResponse(){
        return await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);
    }

    serializeCountries(countries){
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    createShortCitiesList(cities) {
        return Object.values(cities).reduce( (acc, city) => {
            acc[city.full_name] = null;
            return acc;
        }, {})
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const country_name = this.getCountryNameByCityCode(city.country_code);
            city.name = city.name || city.name_translations.en;
            const full_name = `${city.name}, ${country_name}`;

            acc[city.code] = {...city, country_name, full_name};
            return acc;
        }, {});
    }

    serializeAirlines(airlines) {
        return airlines.reduce( (acc, airline)=> {
            airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
            airline.name = airline.name || airline.name_translations.en;
            acc[airline.code] = airline;
            return acc;
        }, {} )
    }

    serializeTickets(tickets) {
        return Object.values(tickets)
            .reduce( (acc, ticket) => {
                const mark = this.getTicketMark(ticket);
                acc[mark] = this.createTicketEntry(ticket, mark);
                return acc;
            }, {} );
    }

    createTicketEntry(ticket, mark){
        return {
            ...ticket,
            mark: mark,
            origin_name:this.getCityNameByCode(ticket.origin),
            destination_name: this.getCityNameByCode(ticket.destination),
            airline_logo: this.getAirlineLogoByCode(ticket.airline),
            airline_name: this.getAirlineNameByCode(ticket.airline),
            departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
            return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
            currency: this.currency.currencyValue,
        };
    }

    getTicketMark({ flight_number, departure_at, return_at}) {
        return `${flight_number}-${this.formatDate(departure_at, 'T')}-${this.formatDate(return_at, 'T')}`;
    }

    getCountryNameByCityCode(code) {
        return this.countries[code].name;
    }

    getCityCodeByKey(key){
        const city = Object.values(this.cities).find( (city) => city.full_name === key );
        if(!city) {
            return;
        }
        return city.code;
    }

    getCityNameByCode(code){
        return this.cities[code].name;
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    getTicketByMark(mark){
        if(this.lastSearch.hasOwnProperty(mark)){
            return this.lastSearch[mark];
        }
        console.error('Билет не найден');
        
    }

   async fetchTickets(params){
       const response = await this.api.prices(params);
       this.lastSearch = this.serializeTickets(response.data);
       return this.lastSearch;
   }
}

const locations = new Locations(api, {formatDate}, currencyUI);

export default locations;
