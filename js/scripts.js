// Función para obtener datos del clima
async function fetchWeather(city) {
    // Definir la URL de la API del clima
    const url = "https://api.openweathermap.org/data/2.5/weather";
    // Clave de API para acceder a la API del clima
    const apiKey = "21e3195e9bfeb6879e788ec605b09ab0";
    // Unidades de medida para la temperatura (en este caso, Celsius)
    const units = "metric";
    // Idioma para los datos de respuesta (en este caso, español)
    const lang = "es";

    // Realizar una solicitud GET a la API del clima
    const response = await fetch(`${url}?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`);
    // Convertir la respuesta a formato JSON
    const data = await response.json();
    // Devolver los datos del clima
    return data;
}

// Función para actualizar la tarjeta con los datos del clima
async function updateWeatherCard(city) {
    // Obtener los datos del clima para la ciudad especificada
    const weatherData = await fetchWeather(city);
    console.log(weatherData);
     // Actualizar el elemento HTML con el nombre de la ciudad
    //document.getElementById("city").textContent = weatherData.name;
    // Actualizar el elemento HTML con la temperatura
    document.getElementById("temperature").textContent = weatherData.main.temp;
    // Actualizar el elemento HTML con la descripción del clima
    document.getElementById("weather").textContent = weatherData.weather[0].description;
    // Actualizar el elemento HTML con la humedad
    document.getElementById("humidity").textContent = weatherData.main.humidity;
    // Actualizar el elemento HTML con la velocidad del viento
    document.getElementById("windSpeed").textContent = weatherData.wind.speed;
    // Obtener el código del icono del clima
    const iconCode = weatherData.weather[0].icon;
    // Construir la URL del icono del clima
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    // Actualizar el elemento HTML con el ícono del clima
    document.getElementById("weatherIcon").src = iconUrl;
    // Establecer el atributo "alt" del ícono del clima con la descripción del clima
    document.getElementById("weatherIcon").alt = weatherData.weather[0].description;
}

// Llamar a la función updateWeatherCard con un valor por defecto
updateWeatherCard('Buenos Aires');

// Llamar a la función al seleccionar una opción
function mostrarCiudad(){
/* Para obtener el valor del select*/
var valor = document.getElementById("ciudad").value;
// Llamar a la función updateWeatherCard con el valor obtenido
updateWeatherCard(valor);
/* Para obtener el texto */
var combo = document.getElementById("ciudad");
var seleccion = combo.options[combo.selectedIndex].text;
console.log(seleccion);
}

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