document.addEventListener('DOMContentLoaded', async function () {//cuando se cargue el documento se ejecuta la funcion anonima async  
    await getBoooksResquest();//llamamos a la funcion de obtener libros para hacer la peticion al servidor

    const saveBookButton = document.getElementById('saveBookButton');//boton de guardar del modal
    saveBookButton.addEventListener('click', async function () {//evento de click al boton guardar
        const piezaName = document.getElementById('name').value;//obtenemos el valor del input nombre del libro
        const piezaFabricante = document.getElementById('fabricante').value;//obtenemos el valor del input autor del libro
        const piezaState = document.getElementById('state').value;//obtenemos el valor del input genero del libro
        const piezaPrecio = document.getElementById('precio').value;//obtenemos el valor del input precio del libro
        const piezaNumeroPiezas = document.getElementById('numeroPiezas').value;//obtenemos el valor del input numero de paginas del libro
        //const bookEstado = document.getElementById('cbox1').checked;//obtenemos el valor del input estado del libro

        await saveBookRequest({piezaName, piezaFabricante, piezaState, piezaPrecio, piezaNumeroPiezas});//llamamos a la funcion de guardar libro, pasamos los datos del libro a guardar como objeto, estos datos se pasan como parametros a la funcion saveBookRequest y son llevados al servidor 
        hideModal('createPieza');//ocultamos el modal
        await getBoooksResquest();//llamamos a la funcion de obtener libros del servidor
    });

    const deleteBookButton = document.getElementById('deletePiezaButton');//boton de eliminar
    deleteBookButton.addEventListener('click', async function () {//evento de click
        const piezaId = document.getElementById('deletePiezaID').innerHTML;//obtenemos el id del libro a eliminar, innerHTML se usa para obtener el valor del id
        await deleteBookRequest(piezaId);//llamamos a la funcion de eliminar libro pasando el id del libro a eliminar como parametro al servidor
        hideModal('deleteBookModal');//ocultamos el modal
        await getBoooksResquest();//llamamos a la funcion de obtener libros
    });

    const updateBookButton = document.getElementById('updateBookButton');//boton de actualizar optenido por id del modal
    updateBookButton.addEventListener('click', async function () {//evento de click
        const bookID = document.getElementById('editPiezaID').innerHTML;//obtenemos el id del libro a actualizar
        const bookName = document.getElementById('editPiezaTitle').value;//obtenemos el valor del input nombre del libro, value se usa para obtener el valor del titulo,value a diferencia de innerHTML se usa para obtener el valor de un input
        const bookAuthor = document.getElementById('editPiezaFabricante').value;//obtenemos el valor del input autor del libro
        const bookGenre = document.getElementById('editPiezaState').value;//obtenemos el valor del input genero del libro
        const bookPrecio = document.getElementById('editPiezaPrecio').value;//obtenemos el valor del input precio del libro
        const bookNumeroPaginas = document.getElementById('editPiezaNumeroPiezas').value;//obtenemos el valor del input numero de paginas del libro
        //const bookEstado = document.getElementById('cbox1').checked;//obtenemos el valor del input estado del libro

        await updateBookRequest({bookID, bookName, bookAuthor, bookGenre, bookPrecio, bookNumeroPaginas});//llamamos a la funcion de actualizar libro
        hideModal('editBookModal');//ocultamos el modal
        await getBoooksResquest();//llamamos a la funcion de obtener libros        
    });

    
    


});  


    
  function showBooks(books){//mostrar libros en la tabla books del archivo books.txt
    let arrayBooks = '';//variable para almacenar los libros
    if (!!books && books.length > 0) {//si hay libros
      books.forEach(book => {//recorremos los libros
        arrayBooks += `
        <tr>
            <td scope="row">${book.id}</td>
          <td>${book.nombreP}</td>
          <td>${book.statePieza}</td>
          <td>${book.makerPieza}</td>
          

          
          <td>
            <button type="button" class="btn btn-primary" onclick="editBook('${book.id}','${book.nombreP}','${book.statePieza}','${book.makerPieza}','${book.preciounit}','${book.numeroPiezas}','${book.estado}')">Editar<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg></button>
          </td>

          <td>
            <button type="button" class="btn btn-danger" onclick="deleteBook('${book.id}','${book.nombreP}')">Eliminar<i class="bi bi-trash"></i></button>
          </td>

          <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getBookRequest('${book.id}','${book.nombreP}','${book.statePieza}','${book.makerPieza}','${book.preciounit}','${book.numeroPiezas}')" > mostrar <i class="bi bi-eye"></i></button>
          </td>

          <td>${book.preciounit}</td>
          <td>${book.numeroPiezas}</td>
          
        </tr>
        `;
      });
    } else {
      arrayBooks = `
      <tr class="table-warning">
        <td colspan="6" class="text-center">Sin libros para gestionar</td>
      </tr>
      `;
    }
    
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = arrayBooks;
}


   



async function getBoooksResquest() {//funcion para obtener libros
    try {//try hace que se ejecute el codigo y si hay un error se ejecuta el catch
        let response = await fetch('http://localhost:3000/books');//hacemos la peticion al servidor y esperamos la respuesta con await, fetch devuelve una promesa y await espera la respuesta de la promesa, la promesa significa que se ejecuta el codigo y cuando se resuelva la promesa se ejecuta el codigo que esta despues del await
        let data = await response.json();// convertimos la respuesta a json, await espera la respuesta de la promesa, response.json() devuelve una promesa  
        showBooks(data);//llamamos a la funcion de mostrar libros, 
        } catch (error) {
        //console.log(error);
        showBooks(null);//llamamos a la funcion de mostrar libros
    }
}

//peticiones al servidor
async function saveBookRequest({piezaName, piezaState, piezaFabricante, piezaPrecio, piezaNumeroPiezas}) {//funcion para guardar libro
    try {
        let request = await fetch('http://localhost:3000/books', {//hacemos la peticion al servidor
            method: 'POST',//metodo post para crear libro, post para crear, get para obtener, put para actualizar, delete para eliminar 
            headers: {
                "Content-Type": 'application/json'//tipo de contenido que se envia
            },
            body: JSON.stringify({//convertimos los datos a json
                nombreP: piezaName,//obtenemos el nombre del libro
                statePieza: piezaState,//en fabricacion o terminado
                makerPieza: piezaFabricante,
                preciounit: piezaPrecio,
                numeroPiezas: piezaNumeroPiezas,
                
            })
        });
        let data = await request.json();
        if (data.ok) {//si se creo el libro el servidor nos devuelve un ok
            alert('Pieza created successfully');//mostramos mensaje de libro creado
        } else {
          alert('Error creating pieza');
        }
            
        hideModal('createBook');//ocultamos el modal
        location.reload();//recargamos la pagina
    } catch (error) {
        //console.log(error);
    }
  }

  //funcion para obtener un libro con metodo get al servidor
  async function getBookRequest(id, nombreP, genre, author, precio, numeroPaginas) {//funcion para obtener libro
    try {
        let request = await fetch(`http://localhost:3000/books/${id}`, {//hacemos la peticion al servidor
            method: 'GET'//metodo get para obtener libro
        });
        let data = await request.json();
        if (data.ok) {//si se obtuvo el libro el servidor nos devuelve un ok
            alert('Pieza Obtenida Satisfactoriamente');//mostramos mensaje de libro obtenido
            mostrarBook(id, nombreP, genre, author, precio, numeroPaginas);//llamamos a la funcion de mostrar libro
        } else {
          alert('Error getting pieza');
        }
    } catch (error) {
        //console.log(error);
    }
  }



  async function deleteBookRequest(id) {//funcion para eliminar libro
    try {
        let request = await fetch(`http://localhost:3000/books/${id}`, {//hacemos la peticion al servidor
            method: 'DELETE'//metodo delete para eliminar libro
        });
        let data = await request.json();
        if (data.ok) {//si se elimino el libro el servidor nos devuelve un ok
            alert('Pieza Eliminada Satisfactoriamente');//mostramos mensaje de libro eliminado
        } else {
          alert('Error deleting Pieza');
        }
        hideModal('deleteBookModal');//ocultamos el modal
        location.reload();//recargamos la pagina
    } catch (error) {
        //console.log(error);
    }
  }

  async function updateBookRequest({bookID, bookName, bookAuthor, bookGenre, bookPrecio, bookNumeroPaginas}) {//funcion para actualizar libro
    try {
        let request = await fetch(`http://localhost:3000/books/${bookID}`, {//hacemos la peticion al servidor
            method: 'PUT',//metodo put para actualizar libro
            headers: {
                "Content-Type": 'application/json'//tipo de contenido que se envia
            },
            body: JSON.stringify({//convertimos los datos a json
                nombreP: bookName,//obtenemos el nombre del libro
                makerPieza: bookAuthor,
                statePieza: bookGenre,
                preciounit: bookPrecio,
                numeroPiezas: bookNumeroPaginas,
                
            })
        });
        const data = await request.json();

        if (data.ok) {//si se actualizo el libro el servidor nos devuelve un ok
            alert('Pieza Actualizada Satisfactoriamente');//mostramos mensaje de libro actualizado
        } else {
          alert('Error updating pieza');
        }

      } catch (error) {
        alert('Error');
      }
  }


  //funiones para mostrar y ocultar modal
  
  function showModal(idModal) {//mostrar modal con parametro idModal
    const myModal = new bootstrap.Modal(`#${idModal}`,{
        keyboard: false
    });
    myModal.show();
  }

  function hideModal(modalId) {
    const existingModal = document.getElementById(modalId);//obtenemos el modal
    const modal = bootstrap.Modal.getInstance(existingModal);//obtenemos la instancia del modal
    modal.hide();//ocultamos el modal
  }

  function deleteBook(id, nombreP) {//funcion para eliminar libro
    document.getElementById('deletePiezaID').innerHTML = id;//obtenemos el id del libro a eliminar
    document.getElementById('deletePiezaTitle').innerHTML = nombreP;//obtenemos el titulo de la pieza a eliminar
    showModal('deleteBookModal');//mostramos el modal
  }

  function editBook(id, nombreP, statePieza, makerPieza, preciounit, numeroPiezas) {//funcion para editar libro
    document.getElementById('editPiezaID').innerHTML = id;//obtenemos el id del libro a editar, innerHTML para obtener el valor del id
    document.getElementById('editPiezaTitle').value = nombreP;//obtenemos el titulo del libro a editar, value para obtener el valor del titulo
    document.getElementById('editPiezaState').value = statePieza;//obtenemos el genero del libro a editarstatePieza
    document.getElementById('editPiezaFabricante').value = makerPieza;//obtenemos el autor del libro a editar
    document.getElementById('editPiezaPrecio').value = preciounit;//obtenemos el precio del libro a editar
    document.getElementById('editPiezaNumeroPiezas').value = numeroPiezas;//obtenemos el numero de paginas del libro a editar
    
    

    showModal('editBookModal');//mostramos el modal
  }

  function mostrarBook(id, nombreP, statePieza, makerPieza, preciounit, numeroPiezas) {//funcion para mostrar libro
    document.getElementById('ShowCardBookID').innerHTML = id;//obtenemos el id del libro a mostrar
    document.getElementById('ShowCardBookTitle').innerHTML = nombreP;//obtenemos el titulo del libro a mostrar
    document.getElementById('ShowCardBookGenre').innerHTML = statePieza;//obtenemos el genero del libro a mostrar
    document.getElementById('ShowCardBookAuthor').innerHTML = makerPieza;//obtenemos el autor del libro a mostrar
    document.getElementById('ShowCardBookPrecio').innerHTML = preciounit;//obtenemos el precio del libro a mostrar
    document.getElementById('ShowCardBookNumeroPaginas').innerHTML = numeroPiezas;//obtenemos el numero de paginas del libro a mostrar
   
   

  } 

  

  
 