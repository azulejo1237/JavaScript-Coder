// Iniciar sesion Formulario
const botonIniciarSesion = document.querySelector(".iniciar-sesion__boton")

botonIniciarSesion.addEventListener("click", (e) => {
    e.preventDefault()
    Swal.fire({
        title: 'Iniciar sesión',
        html: `<input type="email" id="login" class="swal2-input" placeholder="Correo">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Ingresar',
        focusConfirm: false,


        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!login || !password) {
                Swal.showValidationMessage(`Por favor ingrese correo y contraseña`)
            }
            return { login: login, password: password }
        }
    }).then((result) => {
        Swal.fire(`
        Correo: ${result.value.login}
        Contraseña: ${result.value.password}
        `.trim())
    })
})

// Productos Card
const cardProductoContenido = document.getElementById("card-producto__contenido")

// Agregar al carrito boton
function agregarAlCarritoBotones() {
    const agregarAlCarrito__botones = document.querySelectorAll(".agregarAlCarrito__boton")
    agregarAlCarrito__botones.forEach(agregarAlCarritoBoton => {
        agregarAlCarritoBoton.addEventListener("click", agregarAlCarritoClick)
    })
}
// Procesaores Fetch
function procesadoresProductos() {
    fetch("./json/procesadores.json")
        .then(promesa => promesa.json())
        .then(data => {
            data.forEach((producto) => {
                cardProductoContenido.innerHTML += `
        <div class="col d-flex justify-content-center mb-4">
        <div class="card shadow mb-1 card-withd card-width contenedorProducto">
            <h5 class="card-title pt-2 text-center productoTitulo">${producto.nombre}</h5><img 
                src="${producto.img}" class="card-img-top productoImg" alt="...">
            <div class="card-body">
                <h5 class="text-primary"><span class="precio productoPrecio">$${producto.precio}</span></h5>
                <div class="d-grid gap-2"><button class="btn text-light button agregarAlCarrito__boton">Añadir a Carrito</button></div>
            </div>
        </div>
    </div>
    `
            })
            agregarAlCarritoBotones()
        })
}
// Rams Fetch
function ramsProducto() {
    fetch("./json/rams.json")
        .then(promesa => promesa.json())
        .then(data => {
            data.forEach((producto) => {
                cardProductoContenido.innerHTML += `
        <div class="col d-flex justify-content-center mb-4">
        <div class="card shadow mb-1  rounded card-withd card-width contenedorProducto">
            <h5 class="card-title pt-2 text-center text-dark productoTitulo">${producto.nombre}</h5><img 
                src="${producto.img}" class="card-img-top productoImg" alt="...">
            <div class="card-body">
                <h5 class=""><span class="precio productoPrecio">$${producto.precio}</span></h5>
                <div class="d-grid gap-2"><button class="btn text-light button agregarAlCarrito__boton">Añadir a Carrito</button></div>
            </div>
        </div>
    </div>
    `
            })
            agregarAlCarritoBotones()
        })
}
function mothersProducto() {
    fetch("./json//mothers.json")
        .then(promesa => promesa.json())
        .then(data => {
            data.forEach((producto) => {
                cardProductoContenido.innerHTML += `
        <div class="col d-flex justify-content-center mb-4">
        <div class="card shadow mb-1  rounded card-withd card-width contenedorProducto">
            <h5 class="card-title pt-2 text-center text-dark productoTitulo">${producto.nombre}</h5><img 
                src="${producto.img}" class="card-img-top productoImg" alt="...">
            <div class="card-body">
                <h5 class=""><span class="precio productoPrecio">$${producto.precio}</span></h5>
                <div class="d-grid gap-2"><button class="btn text-light button agregarAlCarrito__boton">Añadir a Carrito</button></div>
            </div>
        </div>
    </div>
    `
            })
            agregarAlCarritoBotones()
        })
}
function todosLosProductos() {
    procesadoresProductos()
    mothersProducto()
    ramsProducto()
}
// categoria todos los productos 
const categoriaTodosLosProductos = document.getElementById("categoriaTodosLosProductos")
categoriaTodosLosProductos.addEventListener("click", () => {
    cardProductoContenido.innerHTML = ``
    todosLosProductos()
})
// categoria procesadores
procesadoresProductos()
const categoriaProcesador = document.getElementById("categoriaProcesadores")
categoriaProcesadores.addEventListener("click", () => {
    cardProductoContenido.innerHTML = ``
    procesadoresProductos()
})
// categoria mothers
mothersProducto()
const categoriaMothers = document.getElementById("categoriaMothers")
categoriaMothers.addEventListener("click", () => {
    cardProductoContenido.innerHTML = ``
    mothersProducto()
})
// categoria Ram
ramsProducto()
const categoriaRam = document.getElementById("categoriaRam")
categoriaRam.addEventListener("click", () => {
    cardProductoContenido.innerHTML = ``
    ramsProducto()
})


// Boton comprar
const comprarButton = document.querySelector('.comprarButton')
comprarButton.addEventListener('click', comprarButtonClicked)

const shoppingCartItemsContainer = document.querySelector(".carritoDeCompraContenedorItems")

function agregarAlCarritoClick(event) {
    const boton = event.target
    const contenedorProductoItem = boton.closest(".contenedorProducto")
    const productoTitulo = contenedorProductoItem.querySelector(".productoTitulo").textContent
    const productoPrecio = contenedorProductoItem.querySelector(".productoPrecio").textContent
    const productoImg = contenedorProductoItem.querySelector(".productoImg").src

    agregarItemsAlCarrito(productoTitulo, productoPrecio, productoImg)
}

// Agregar al carrito
function agregarItemsAlCarrito(productoTitulo, productoPrecio, productoImg) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );
    Toastify({
        text: "Producto añadido al carrito",
        gravity: "bottom",
        stopOnFocus: false,
        duration: 1200,
        style: {
            background: "var(--NaranjaRGBA)",

        }
    })
        .showToast();
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === productoTitulo) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            updateShoppingCartTotal();
            return;
        }
    }

    // Contenedor productos
    const carritoDeCompraFila = document.createElement("div")
    const carritoDeCompraContenedor = `
        <div class="row shoppingCartItem item">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 pb-2 pt-3">
                <img src=${productoImg} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle ml-3 mb-0">${productoTitulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 pb-2 pt-3">
            <div class="item-details">
                <p class="item-price mb-0 shoppingCartItemPrice">${productoPrecio}</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>
        `

    carritoDeCompraFila.innerHTML = carritoDeCompraContenedor
    shoppingCartItemsContainer.append(carritoDeCompraFila)

    carritoDeCompraFila
        .querySelector('.buttonDelete')
        .addEventListener('click', removeShoppingCartItem);

    carritoDeCompraFila
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', quantityChanged);
    updateShoppingCartTotal()


}
// Precio total y actualizar precio
function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal')
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem')

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity

    });

    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`


}

// Boton remover producto
function removeShoppingCartItem(event) {
    const buttonClicked = event.target
    buttonClicked.closest('.shoppingCartItem').remove()
    updateShoppingCartTotal()
}

// Boton cantidad
function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

// Boton comprar
function comprarButtonClicked() {
    Swal.fire({
        title: 'Gracias por su compra',
        text: 'Pronto recibirá su pedido',
    })
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}

