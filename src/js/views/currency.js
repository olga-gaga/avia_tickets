class CurrencyUI {
    constructor(){
        this.currency = document.getElementById('currency');
        this.dictionary = {
            USD: '$',
            EUR: '€'
        }
    }

    get currencyValue(){
        return this.currency.value;
    }

    getCurrencySymbol(code){
        if(code && this.dictionary.hasOwnProperty(code)) {
            return this.dictionary[code];
        }
        return this.dictionary[this.currencyValue];
    }

    /*getCurrencySymbolByCode(code){
        if(this.dictionary.hasOwnProperty(code)){
            return this.dictionary[code];
        }
        console.error('В словаре нет такой валюты');
        
    }*/
}

const currencyUI = new CurrencyUI();

export default currencyUI;