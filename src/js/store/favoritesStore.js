class FaveTickets{
    constructor(){
        this._tickets = JSON.parse(sessionStorage.getItem('favourites')) || {};
    }

    get tickets(){
        return Object.values(this._tickets);
    }

    addTicket(ticket, currency) {
        if(!this._tickets.hasOwnProperty(ticket.mark)) {
            this._tickets[ticket.mark] = {
                ...ticket,
                currency: currency,
            };
            sessionStorage.setItem('favourites', JSON.stringify(this._tickets));
        }
        
    }


    deleteFromFavorites(mark){
        if(this._tickets.hasOwnProperty(mark)) {
            delete this._tickets[mark];
            sessionStorage.setItem('favourites', JSON.stringify(this._tickets));
            return true;
        }
        return false;
    }
}

const faveTickets = new FaveTickets();

export default faveTickets;