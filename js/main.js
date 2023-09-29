const opciones = {
    autoparte: ["Motor", "Transmisión", "Suspensión y dirección", "Encendido", "Frenos", "Tren Delantero", "Climatización", "Carrocería", "Accesorios", "Embrague", "Productos de Limpieza"],
    modelo: ["Golf", "Passat", "Polo", "Tiguan", "Amarok", "Scirocco", "Bora", "Caddy", "Fox", "Gol Trend", "Gol Power", "Suran", "Up"],
    anio: ["1990/99", "03/08", "09/2014", "2014/19", "2020/23"],
    color: ["Rojo", "Azul", "Negro", "Blanco", "Gris", "Plata", "Verde", "Amarillo"],
    pack: ["1", "2", "3", "super full"],
    cubiertas: ["R13", "R14", "R16", "R18"],
    workshop: ["Camiseta Ls de workshop", "Buzo Ls de workshop", "Pantalones Ls de workshop"]
  };
  
  function obtenerSeleccion(opciones, categoria) {
    if (opciones[categoria]) {
      const container = document.getElementById("opciones-container");
      const categoriaDiv = document.createElement("div");
      categoriaDiv.innerHTML = `<h3>Elige una opción de ${categoria}:</h3>`;
      container.appendChild(categoriaDiv);
  
      opciones[categoria].forEach((opcion, index) => {
        const opcionDiv = document.createElement("div");
        opcionDiv.innerHTML = `<label>${index + 1}. <input type="radio" name="${categoria}" value="${opcion}">${opcion}</label>`;
        categoriaDiv.appendChild(opcionDiv);
      });
    }
  }
  
  for (const categoria in opciones) {
    obtenerSeleccion(opciones, categoria);
  }
  
  document.getElementById("combinar-button").addEventListener("click", () => {
    const seleccion = {};
    for (const categoria in opciones) {
      const inputElements = document.getElementsByName(categoria);
      const selectedInput = Array.from(inputElements).find((input) => input.checked);
  
      if (selectedInput) {
        seleccion[categoria] = selectedInput.value;
      } else {
        console.log(`Por favor, selecciona una opción de ${categoria}.`);
        return; 
      }
    }
  
    const combinacionMensaje = `¡Elegiste la combinación: ${seleccion.autoparte} + ${seleccion.modelo} + ${seleccion.anio} + ${seleccion.color} + ${seleccion.pack} + ${seleccion.cubiertas}  + ${seleccion.workshop}!`;
    console.log(combinacionMensaje);
  
  
    const combinacionesGuardadas = JSON.parse(localStorage.getItem("combinaciones")) || [];
    combinacionesGuardadas.push(seleccion);
    localStorage.setItem("combinaciones", JSON.stringify(combinacionesGuardadas));
  
   
    mostrarCombinacionesGuardadas();
  });
  
  function mostrarCombinacionesGuardadas() {
    const combinacionesGuardadas = JSON.parse(localStorage.getItem("combinaciones")) || [];
    const combinacionesContainer = document.getElementById("combinaciones-guardadas");
  
    combinacionesContainer.innerHTML = "<h2>Combinaciones Guardadas:</h2>";
  
    if (combinacionesGuardadas.length === 0) {
      combinacionesContainer.innerHTML += "<p>No hay combinaciones guardadas.</p>";
    } else {
      combinacionesGuardadas.forEach((combinacion, index) => {
        combinacionesContainer.innerHTML += `<p>Combinación ${index + 1}: ${combinacion.autoparte} + ${combinacion.modelo} + ${combinacion.anio} + ${combinacion.color} + ${combinacion.pack} + ${combinacion.cubiertas} + ${combinacion.workshop}</p>`;
      });
    }
  }
  
  mostrarCombinacionesGuardadas();