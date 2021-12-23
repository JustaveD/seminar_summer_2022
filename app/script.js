const el = document.querySelector('.answer_wrapper');

let sortable = new Sortable(el, {
    animation: 150,
    ghostClass: 'blue-background-class'
});