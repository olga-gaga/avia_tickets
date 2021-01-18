class FaveTickets{
    constructor(){
        this._tickets = null;
    }

    set tickets(tickets) {
        if(!tickets.length){
            console.error("Передайте в функцию массив");
            return;
        }
        this._tickets = tickets.reduce( (acc, ticket) => {
            acc[ticket.flight_number] = ticket;
            return acc;
        }, {});
    }

    get tickets(){
        return this._tickets;
    }

    addTicket(ticket) {
        this._tickets.push(ticket);
    }


    deleteFromFavorites(flight_number){
        if(Object.keys(this._tickets).indexOf(flight_number) >= 0) {
            delete this._tickets[flight_number];
        }
    }
}

const faveTickets = new FaveTickets();

export default faveTickets;