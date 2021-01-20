import currencyUI from './currency';
import { TicketsUI } from './tickets';
class FaveTicketsUI extends TicketsUI{
    constructor(currency, selector){
        super(currency, selector);
    }

    renderTickets(tickets){
        super.clearContainer();
        const ticketsArr = Object.values(tickets);

        if(!ticketsArr.length){
            this.showEmptyMessage();
            return;
        }
        super.addFragment(tickets, FaveTicketsUI.faveTicketTemplate.bind(this));
    }

    showEmptyMessage() {
        const template = FaveTicketsUI.emptyMessageTemplate();
        this.container.insertAdjacentHTML('afterBegin', template);
    }

    static emptyMessageTemplate() {
        return `
            <div class="favorite-item d-flex align-items-start favorites-empty-res-msg">
                У Вас нет избранных билетов.
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

const faveTickets = new FaveTicketsUI(currencyUI, '.dropdown-content');
export default faveTickets;