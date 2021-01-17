import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

//Init select
const select = document.querySelector('select');
M.FormSelect.init(select);

export function getSelectInstance(element){
    return M.FormSelect.getInstance(element);
}

// Init autocomplite

const autocomplite = document.querySelectorAll('.autocomplete');

M.Autocomplete.init(autocomplite, {
    data: {
    "Apple": null,
    "Microsoft": null,
    "Google": 'https://placehold.it/250x250'
  }});

export function getAutocompliteInstance(element){
    return M.Autocomplete.getInstance(element);
}

// Init datepickers

const datepickers = document.querySelectorAll('.datepicker');

M.Datepicker.init(datepickers, {
    showClearBtn: true,
    format: 'yyyy-mm',
});

export function getDatepickerInstance(element){
    return M.Datepicker.getInstance(element);
}
