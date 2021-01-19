import '../css/style.css';
import './plugins'; 
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import {ticketUI} from './views/tickets';
import faveTickets from './store/favoritesStore';
import faveTicketsUI from './views/favouritesView';

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Elements
    const form = formUI.form;
    const ticketsSection = document.querySelector('.tickets-sections');
    const dropdownTrigger = document.querySelector('.dropdown-content');
    console.log(ticketsSection);
    console.log(dropdownTrigger);

    // Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    dropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault;
        if(e.target.classList.contains('delete-favorite')){
            onDeleteFavouriteHandler(e.target);
        }
    });

    ticketsSection.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-favorite')){
            onAddFavouriteHandler(e.target);
        }
    });

    // Handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompliteData(locations.shortCitiesList);
        faveTicketsUI.renderTickets(faveTickets.tickets);
    }

    async function onFormSubmit(){
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;

        console.log(origin, destination, depart_date, return_date);
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });

        console.log('lastSearch: ', locations.lastSearch);

        //const ticketsUI = new TicketsUI(currencyUI, '.tickets-sections .row');
        ticketUI.renderTickets(locations.lastSearch);
    }

    function onAddFavouriteHandler(button) {
        const currency = currencyUI.currencyValue;
        const parent = button.closest(".card");
        const mark = parent.dataset.mark;
        console.log(mark);
        const ticket = locations.getTicketByMark(mark);
        console.log(ticket);
        faveTickets.addTicket(ticket, currency);
        //const faveTicketsUI = new TicketsUI(currencyUI, '.dropdown-content');
        //faveTicketsUI.renderTickets(faveTickets.tickets, TicketsUI.faveTicketTemplate);*/
        faveTicketsUI.renderTickets(faveTickets.tickets);
    }

    function onDeleteFavouriteHandler(button){
        console.log(button); 
        const parent = button.closest('.favorite-item');
        console.log(parent);
        const mark = parent.dataset.mark;
        if (faveTickets.deleteFromFavorites(mark)) {
            parent.remove();
        }
    }
});