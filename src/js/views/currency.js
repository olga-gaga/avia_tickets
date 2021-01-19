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

    getCurrencySymbolFromForm(){
        console.log(this.currencyValue);
        return this.dictionary[this.currencyValue];
    }

    getCurrencySymbolByCode(code){
        if(this.dictionary.hasOwnProperty(code)){
            return this.dictionary[code];
        }
        console.error('В словаре нет такой валюты');
        
    }
}

const currencyUI = new CurrencyUI();

export default currencyUI;