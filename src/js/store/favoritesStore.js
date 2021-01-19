class FaveTickets{
    constructor(){
        this._tickets = JSON.parse(sessionStorage.getItem('favourites')) || {};
    }

    /*set tickets(tickets) {
        if(!tickets.length){
            console.error("Передайте в функцию массив");
            return;
        }
        this._tickets = tickets.reduce( (acc, ticket) => {
            acc[ticket.flight_number] = ticket;
            return acc;
        }, {});
    }*/

    get tickets(){
        //this._tickets = JSON.parse(sessionStorage('favourites'));
        return Object.values(this._tickets);
    }

    addTicket(ticket, currency) {
        if(!this._tickets.hasOwnProperty(ticket.mark)) {
            this._tickets[ticket.mark] = {
                ...ticket,
                currency: currency,
            };
            //console.log(this._tickets);
            sessionStorage.setItem('favourites', JSON.stringify(this._tickets));
        }
        
    }


    deleteFromFavorites(mark){
        if(this._tickets.hasOwnProperty(mark)) {
            console.log(this._tickets[mark]);
            delete this._tickets[mark];
            console.log(this._tickets);
            sessionStorage.setItem('favourites', JSON.stringify(this._tickets));
            return true;
        }
        console.log(this._tickets);
        return false;
    }
}

const faveTickets = new FaveTickets();

export default faveTickets;