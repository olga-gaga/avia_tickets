import '../css/style.css';
import './plugins'; 
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketUI from './views/tickets';
import faveTickets from './store/favoritesStore';
import faveTicketsUI from './views/favouritesView';

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Elements
    const form = formUI.form;
    const ticketsSection = document.querySelector('.tickets-sections');
    const dropdownTrigger = document.querySelector('.dropdown-content');

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
        const dataObj = getFormData();
        if (checkEmptyObj(dataObj)) {
            return;
        }
        const ticketsList = await locations.fetchTickets(dataObj);
        ticketUI.renderTickets(ticketsList);
    }

    function getFormData() {
        return{
            origin: formUI.originValue && locations.getCityCodeByKey(formUI.originValue),
            destination: formUI.destinationValue && locations.getCityCodeByKey(formUI.destinationValue),
            depart_date: formUI.departDateValue,
            return_date: formUI.returnDateValue,
            currency: currencyUI.currencyValue
        }
    }

    function onAddFavouriteHandler(button) {
        const parent = button.closest(".card");
        const mark = parent.dataset.mark;
        const ticket = locations.getTicketByMark(mark);
        faveTickets.addTicket(ticket);
        faveTicketsUI.renderTickets(faveTickets.tickets);
    }

    function onDeleteFavouriteHandler(button){
        const parent = button.closest('.favorite-item');
        const mark = parent.dataset.mark;
        if (faveTickets.deleteFromFavorites(mark)) {
            parent.remove();
            faveTicketsUI.renderTickets(faveTickets.tickets);
        }
    }

    function checkEmptyObj (object) {
        const isEmpty = Object.values(object).some(el => !el);
        if (isEmpty) {
            M.toast({html: 'Wrong data'});
        }
        return isEmpty;
    }
});