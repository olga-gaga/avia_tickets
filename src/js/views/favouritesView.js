class FaveTicketsUI{
    constructor(){
        this.container = document.querySelector("dropdown1");
    }
    
    renderFaveTickets(tickets) {
        this.clearContainer();
        
    }

    clearContainer() {
        this.container.innerHTML = '';
    }
}