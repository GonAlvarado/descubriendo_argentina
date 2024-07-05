// funcion que crea las filas de la tabla administrador
function crearFila (destino) {
    // crea la fila 
    const tr = document.createElement('tr');
    // crea las celdas
    const tdNombre = document.createElement('td');
    const tdProvincia = document.createElement('td');
    const tdImagen = document.createElement('td');
    const tdBotones = document.createElement('td');
    // agrega datos a las celdas
    tdNombre.innerHTML = destino.nombre;
    tdProvincia.innerHTML = destino.provincia;
    // crea la imagen de la celda
    const tdImg = document.createElement('img');
    tdImg.src = `../assets/img/${destino.imagen}`;
    // crea los botones de la celda
    const tdBtnMod = document.createElement('button');
    tdBtnMod.classList.add('mod');
    tdBtnMod.innerHTML = 'Modificar';
    const tdBtnEli = document.createElement('button');
    tdBtnEli.innerHTML = 'Eliminar';
    tdBtnEli.classList.add('elim');
    // agrega los elementos a la fila 
    tdImagen.appendChild(tdImg);
    tdBotones.appendChild(tdBtnMod);
    tdBotones.appendChild(tdBtnEli);
    tr.appendChild(tdNombre);
    tr.appendChild(tdProvincia);
    tr.appendChild(tdImagen);
    tr.appendChild(tdBotones);

    return tr;
}

// datos de la api
const API_SERVER = 'http://127.0.0.1:8080/destinosapi/destinos';
const options = {
    method: 'GET'
};

// Función para cargar destinos en la tabla del administrador
const cargarDestinos = async () => {
    try{
        // Realizamos una petición fetch a la API para obtener los destinos
        const response = await fetch(`${API_SERVER}`, options);
        // Convertimos la respuesta a JSON
        const data = await response.json();
        // Capturamos la tabla   
        const bodyTabla = document.getElementById('bodyTabla');
        // Limpiamos el contenido previo de la tabla
        bodyTabla.innerHTML = '';
        // Iteramos sobre los destinos y los agregamos a la tabla
        data.forEach(place => {
            const destinoTr = crearFila(place);
            bodyTabla.appendChild(destinoTr);
        });
    }catch(error){
        console.error(error);
    }
};
      
// Llamar a la función para cargar los destinos cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => { cargarDestinos()});

const form = document.querySelector('#formA');
const btnEnviar = document.querySelector('#btnEnviar');

const obtenerDatos = () => {
    return datosProcesados;
}

const enviarDatos = async () => {
    const datos = new FormData(form);
    //const datosProcesados = Object.fromEntries(datos.entries());
    const nombre = datos.get('nombre');
    const provincia = datos.get('provincia');
    const descripcion = datos.get('descripcion');
    const imagen = datos.get('imagen');
    const nombreImagen = imagen.name;
    form.reset();
    //const nuevoDestino = obtenerDatos();
    try {
        const response = await fetch ('http://127.0.0.1:8080/destinosapi/destinos', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                nombre: nombre,
                provincia: provincia,
                descripcion: descripcion,
                imagen: nombreImagen
            })
        });
        if(response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}

btnEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    enviarDatos();
});