

function addClick(element, url) {    
    element.addEventListener('click', function() {
        console.log(url);
        window.open(url, '_blank');
    });
}


export {addClick};