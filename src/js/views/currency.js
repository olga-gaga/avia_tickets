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

    getCurrencySymbol(){
        console.log(this.currencyValue);
        return this.dictionary[this.currencyValue];
    }
}

const currencyUI = new CurrencyUI();

export default currencyUI;