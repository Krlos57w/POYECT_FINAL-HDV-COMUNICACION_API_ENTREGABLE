/*logica para la cards de todos las piezas */
//------------------------------MOSTRAR PIEZA GUARDADO EN LA API-----------------------------------
//escuchador de eventos
document.addEventListener('DOMContentLoaded', getPiezas);//cuando se cargue la pagina se ejecuta la funcion

function getPiezas() {//funcion para obtener los datos de la api
    fetch('http://localhost:3000/books')//obtenemos los datos de la api
        .then(response => response.json())
        .then(data => mostrarPiezas(data))//llamamos a la funcion para mostrar los datos
        .catch(error => {
            console.log(error);
            // Puedes agregar aquí código para manejar el error, como mostrar un mensaje al usuario.
        });
}

function mostrarPiezas(listPiezas) {
    let datosPiezasFila = document.getElementById("cardBooks");
    let piezas = "";
    for (var cont = 0; cont < listPiezas.length; cont++) {
        let datosFila = `<div class="card mb-3 bg-dark-subtle border border-2 border-dark" style="max-width: 800px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img src="src/pages/piezas_mecanicas.jpg" class="card-img-top" alt="pieza">

                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h6 class="card-title"> NOMBRE PIEZA: ${listPiezas[cont].nombreP} </h6>
                                        <p class="card-text"> FABRICANTE:  ${listPiezas[cont].makerPieza} </p>
                                        <p class="card-text"> ESTADO DE PIEZA:  ${listPiezas[cont].statePieza} </p>
                                        <p class="card-text"> ID PIEZA:  ${listPiezas[cont].id} </p>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        piezas += datosFila;
    }
    datosPiezasFila.innerHTML = piezas;
}
