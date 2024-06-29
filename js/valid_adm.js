document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.getElementById('formA');
    
    form.addEventListener('submit', (evento)=> {
        let isValid = true;

        const destino = document.getElementById('Destino');
        const provincia = document.getElementById('provincia');
        const descripcion = document.getElementById('descripcion');

        if (destino.value.trim() === '') {
            alert('Por favor, ingresa un destino');
            isValid = false;
        }

        if (provincia.value.trim() === '') {
            alert('Por favor, ingresa una provincia');
            isValid = false;
        }

        if (descripcion.value.trim() === '') {
            alert('Por favor, ingresa una descripción');
            isValid = false;
        }

        if (!isValid) {
            evento.preventDefault();
        }
    });
});

document.addEventListener('keydown', (evento)=> {
    if (evento.key === 'Tab') {
        const activarElemento = document.activarElemento;
        const formInputs = Array.from(document.querySelectorAll('input, textarea'));
        const campoActual = formInputs.indexOf(activarElemento);

        if (campoActual !== -1 && campoActual < formInputs.length - 1) {
            formInputs[campoActual + 1].focus();
            evento.preventDefault();
        }
    }
});
