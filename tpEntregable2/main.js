//debugger; lo pongoo cuando necesito que frene para ver que pasa
document.addEventListener("DOMContentLoaded", () => {
    let _canvas = document.getElementById("canvas");
    let ctx = _canvas.getContext("2d");
    //menu 
    let menu = document.getElementById("buttonMenu");
    //filtro menu
    let iconMenu = document.getElementById('filterIcon');
    //mostrar el nombre del archivo
    let imageFileInput = document.getElementById('imageFile');
    let fileNameSpan = document.getElementById('fileName');



    let tamanio = document.getElementById("pSize"); //cada vez que realizo un cambio en los tamaños varia
    let tamanioPen = tamanio.value;//agarra el valor ingresado toma su valor
    let color = document.getElementById("color");

    let eraserClick = false;


    //tamaño del canvas
    _canvas.width = (window.innerWidth - 40);
    _canvas.height = (window.innerHeight - 100);
    let rect;

    //lapiz y mouse
    let thisColor;
    let mouseDown = false;
    let penClick = false;
    let myPen = null;
    let myEraser = null;
    let pointerX, pointerY;
    //alto y ancho
    let canvasWidth = _canvas.width - 50;
    let canvasHeight = _canvas.height - 50;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    //imagen
    let selectedImage = null;
    let image = null;

    //mouse up necesita volver los valores como estaban originalmente, de lo contrario vamos a estar "borrando" y dibujanndo a la vez
    //esto se debe a que utiliza las mismas variables que pen y ala vez que ambos deben utilizar el mismo mouse up
    _canvas.addEventListener("mouseup", () => {
        mouseDown = false;
        myPen = null;
        myEraser = null;
        pointerX, pointerY = null;
    });
    //llamo por primera vez a esta funcion para mostrar el 1 .... rango: 1  al 100
    showValue();
    tamanio.addEventListener("change", showValue);
    //muestra el valor ingresado en el lapiz por numero
    function showValue() {
        tamanioPen = tamanio.value;
        document.getElementById("showValue").innerHTML = tamanioPen;
    }
    //ingresa el evento para dibujar con un color determinado y un tamaño de pincel determinado
    _canvas.addEventListener("mousedown", (e) => {
        if (penClick == true) {
            mouseDown = true;
            mouseUp = false;
            thisColor = color.value;
            rect = _canvas.getBoundingClientRect();
            pointerX = e.layerX - rect.left;
            pointerY = e.layerY - rect.top;
            myPen = new Pen(pointerX, pointerY, thisColor, ctx, tamanioPen);
        }

    });
    //dibujando con pen
    _canvas.addEventListener("mousemove", (e) => {
        if (mouseDown && myPen != null) {
            rect = _canvas.getBoundingClientRect();
            pointerX = e.layerX - rect.left;
            pointerY = e.layerY - rect.top;
            myPen.moveTo(pointerX, pointerY);
            myPen.draw();
            hideMenus();
        }
    });

    let btnPen = document.getElementById("pen");
    btnPen.addEventListener("click", () => {
        penClick = true;
        eraserClick = false;
    });
    //ingresa el boton goma para borrar un elemento
    let btnEraser = document.getElementById("eraser");
    btnEraser.addEventListener("click", () => {
        eraserClick = true;
        penClick = false;
    });

    _canvas.addEventListener("mousedown", (y) => {

        if (eraserClick == true) {
            mouseDown = true;
            mouseUp = false;
            thisColor = 'white';
            rect = _canvas.getBoundingClientRect();
            pointerX = y.layerX - rect.left;
            pointerY = y.layerY - rect.top;
            myEraser = new Eraser(pointerX, pointerY, thisColor, ctx, tamanioPen);

        }
    });

    _canvas.addEventListener("mousemove", (y) => {
        if (mouseDown && myEraser != null) {
            rect = _canvas.getBoundingClientRect();
            pointerX = y.layerX - rect.left;
            pointerY = y.layerY - rect.top;
            myEraser.moveTo(pointerX, pointerY);
            myEraser.draw();
            hideMenus();
        }
    });
    //menu
    menu.addEventListener("click", () => {
        document.querySelector(".menuFilter").classList.remove("active");
        document.querySelector(".menu").classList.toggle("active");
    });
    //carga de imagen, se acegura que sea un archivo que se pueda mostrar y muestra el nombre del archivo
    imageFileInput.addEventListener('change', () => {
        hideMenus();
        if (imageFileInput.files && imageFileInput.files.length > 0) {
            selectedImage = imageFileInput.files[0]; //agarro el archivo seleccionado
            let fileName = selectedImage.name;//agarro el valor del nombre seleccionado
            //substring toma la ultima linea de String luego del punto (por eso el +1) y los transforma en lowercase
            let fileType = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
            if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
                image = new Photo(ctx, canvasWidth, canvasHeight);
                clearCanvas(); // Limpiar el canvas
                //cargo la imagen
                image.loadImage(selectedImage);
                fileNameSpan.textContent = fileName;
            } else {
                alert("ERROR!Solo archivos JPG, JPEG y PNG");
                fileNameSpan.textContent = null;
                selectedImage = null;//si el archivo que fue cargado es diferente entonces lo vuelvo null
            }
        } else {
            fileNameSpan.textContent = null;
        }
    });
    //guarda la imagen en tu pc
    document.getElementById("downloadImage").addEventListener("click", saveCanvasImage);

    function saveCanvasImage() {
        hideMenus();
        // Crear un enlace temporal
        let link = document.createElement('a');
        link.href = _canvas.toDataURL();// Utiliza la extensión original para determinar el tipo de imagen
        selectedImage = imageFileInput.files[0];
        if (selectedImage != null) {
            //agarro el archivo seleccionado
            let fileName = selectedImage.name;// Configurar el enlace para descargar la imagen
            link.download = fileName; // Usa el nombre original para nombrar el archivo descargado
        } else {
            link.download = "descarga";
        }
        link.click(); // Simular un clic en el enlace para descargar la imagen
        fileNameSpan.textContent = null;
    }
    document.getElementById("resetPaper").addEventListener("click", reset);
    //si voy a llamar constantemente al clear cada vez que la necesito mejor apartarla en una function
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    //resetar el canvas
    function reset() {
        hideMenus();
        fileNameSpan.textContent = null;
        imageFileInput.value = null;
        image = null;
        selectedImage = null;
        clearCanvas();
    }
    //ocultar menus
    function hideMenus() {
        document.querySelector(".menu").classList.remove("active");
        document.querySelector(".menuFilter").classList.remove("active");
    }
    //desplegar menu del icono y ocultar el otro
    iconMenu.addEventListener("click", () => {
        document.querySelector(".menu").classList.remove("active");
        document.querySelector(".menuFilter").classList.toggle("active");
    });
    //mostrar valores de los range en filtros
    function updateRangeValue(inputId, outputId) {
        let input = document.getElementById(inputId);
        let output = document.getElementById(outputId);
        output.textContent = input.value;
    }
    updateRangeValue('brightness', 'brightnessValue');
    updateRangeValue('saturation', 'saturationValue');
    document.getElementById('brightness').addEventListener('input', function() {
        updateRangeValue('brightness', 'brightnessValue');
    });

    document.getElementById('saturation').addEventListener('input', function() {
        updateRangeValue('saturation', 'saturationValue');
    });
    //filtro negativo
    document.getElementById("negative").addEventListener("click", () => {
        if (image != null) {
            image.Fnegative();
        }
    });
    document.getElementById("sepia").addEventListener("click", () => {
        if (image != null) {
            image.Fsepia();
        }
    });
    document.getElementById("binarization").addEventListener("click", () => {
        if (image != null) {
            image.Fbinarization();
        }
    });
    document.getElementById("blur").addEventListener("click", () => {
        if (image != null) {
            image.Fblur();
        }
    });
    document.getElementById("onlyEdges").addEventListener("click", () => {
        if (image != null) {
            image.FonlyEdges();
        }
    });

});
