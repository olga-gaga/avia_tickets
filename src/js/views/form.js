import {getAutocompliteInstance, getDatepickerInstance} from '../plugins/materialize';

class FormUI {
    constructor(autocompliteInstance, datepickerInstance) {
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');

        this.originAutcomplite = autocompliteInstance(this.origin);
        this.destinationAutocomplite = autocompliteInstance(this.destination);

        this.departDatepicker = datepickerInstance(this.depart);
        this.returnDatepicker = datepickerInstance(this.return);
    }

    get form() {
        return this._form;
    }

    get originValue(){
        return this.origin.value;
    }

    get destinationValue(){
        return this.destination.value;
    }

    get departDateValue(){
        return this.departDatepicker.toString();
    }

    get returnDateValue(){
        return this.returnDatepicker.toString();
    }

    setAutocompliteData(data) {
        this.originAutcomplite.updateData(data);
        this.destinationAutocomplite.updateData(data);
    }
}

const formUI = new FormUI(getAutocompliteInstance, getDatepickerInstance);

export default formUI;