//import currencyUI from './currency';
export default class TicketsUI{
    constructor(currency, selector){
        this.container = document.querySelector(selector); 
        this.getCurrencySymbol = currency.getCurrencySymbolFromForm.bind(currency);
    }

    renderTickets(tickets, template){
        this.clearContainer();
        const ticketsArr = Object.values(tickets);

        if(!Array.isArray(ticketsArr) || !ticketsArr.length){
            this.showEmptyMessage();
            return;
        }

        const fragment = this.createTicketsList(ticketsArr, template);

        this.container.insertAdjacentHTML('afterBegin', fragment);
    }

    createTicketsList(tickets, ticketTemplate){
      const currency = this.getCurrencySymbol();
      return tickets
        .reduce( (acc, ticket) => {
          acc += ticketTemplate(ticket, currency);
          return acc;
        }, '');
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    showEmptyMessage() {
        const template = TicketsUI.emptyMessageTemplate();
        this.container.insertAdjacentHTML('afterBegin', template);
    }



    static emptyMessageTemplate() {
        return `
        <div class="tickets-empty-res-msg">
        По вашему запросу билетов не найдено.
        </div>`;
    }

    static ticketTemplate(ticket, currency) {
      return `<div class="col s12 m6">
      <div class="card ticket-card" data-mark="${ticket.mark}">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name">${ticket.airline_name}</span>
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name} </span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
          >Add to favorites</a
        >
      </div>
    </div>`;
    }

    static faveTicketTemplate(ticket, currency) {
     
      return `
          <div class="favorite-item d-flex align-items-start" data-mark="${ticket.mark}">
            <img
                src="${ticket.airline_logo}"
                class="favorite-item-airline-img"
            />
            <div class="favorite-item-info d-flex flex-column">
                <div class="favorite-item-destination d-flex align-items-center">
                    <div class="d-flex align-items-center mr-auto">
                    <span class="favorite-item-city">${ticket.origin_name} </span>
                    <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="medium material-icons">flight_land</i>
                    <span class="favorite-item-city">${ticket.destination_name}</span>
                    </div>
                </div>
                <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket.departure_at}</span>
                    <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                </div>
                <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                </div>
                <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
            </div>
          </div>`;
  }
}

//export const ticketUI = new TicketsUI(currencyUI);
