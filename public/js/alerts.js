export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
}

export const showAlert = (type, msg, time = 5) => {
    hideAlert();
    let markup;
    if(type === 'success') {
        markup = `<div class="alert--container">
        <div class="alert alert--${type}"><i class="fa fa-check"></i>
            <div class="alert--body">${msg}</div>
        </div>
    </div>`;
    } else if(type === 'error'){
        markup = `<div class="alert--container">
        <div class="alert alert--${type}"><i class="fa fa-times"></i>
            <div class="alert--body">${msg}</div>
        </div>
    </div>`;
    };
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
}