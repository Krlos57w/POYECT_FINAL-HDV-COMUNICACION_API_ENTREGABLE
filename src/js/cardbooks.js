/*logica para la cards de todos las piezas */
//------------------------------MOSTRAR LIBRO CUARDADO EN LA API-----------------------------------
//escuchador de eventos
document.addEventListener('DOMContentLoaded', getLibros);//cuando se cargue la pagina se ejecuta la funcion


function getLibros() {//funcion para traer los datos 
    fetch('http://localhost:3000/books')//fetch se usa para hacer peticiones http
        .then(Response => Response.json())//se convierte la respuesta en json, then se usa para ejecutar una funcion cuando se cumpla la promesa
        .then(data => mostrarLibros(data))// 
        .catch(
            function (error) {
                console.log(error);
            });
}

//ingresar datos en el card y mostrarlos en html
function mostrarLibros(listLibros) {
    let datosLibrosFila = document.getElementById("cardBooks");
    let libros = "";
    for (var cont = 0; cont < listLibros.length; cont++) {

        

            let datosFila = `<div class="card mb-3 bg-dark-subtle border border-2 border-dark" style="max-width: 800px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img src="src/pages/piezas_mecanicas.jpg" class="card-img-top" alt="libro">

                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h6 class="card-title"> NOMBRE PIEZA: ${listLibros[cont].nombreP} </h6>
                                        <p class="card-text"> FABRICANTE:  ${listLibros[cont].makerPieza} </p>
                                        <p class="card-text"> ESTADO DE PIEZA:  ${listLibros[cont].statePieza} </p>
                                        <p class="card-text"> ID PIEZA:  ${listLibros[cont].id} </p>
                                    </div>
                                </div>
                            </div>
                        </div>`;


            
            libros += datosFila;
        
    }
    datosLibrosFila.innerHTML = libros
}