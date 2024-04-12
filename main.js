let canvas = document.getElementById('canvas');
let drawFigure = document.getElementById('createFigures');
let ctx = canvas.getContext('2d');
let message = document.getElementById('alert');
let checkPointerInFigure = document.getElementById('pointerInsideFigure');
let pointerInFigure = false;

// Configuracion del canvas y botones
let width = 640;
let height = 480;
canvas.width = width;
canvas.height = height;

let windowWidth = window.innerWidth;
let margin = (windowWidth - width) / 2;
canvas.style.marginLeft = margin + 'px';
drawFigure.style.marginLeft = margin + 'px';
message.style.marginLeft = margin + 'px';
message.style.fontFamily = 'arial';
message.style.fontSize = '24px';

//colores de las figuras
const colors = [
    ['#FF0000', '#00913f', '#FF00FF'] // rojo > verde --- rosa
];
//un arr vacio para guardar las figuras creadas
let selectFigure = null;
let figureWASD = null;

const figures = [];
//posicion del cursor
let pointerX, pointerY, pointerX2, pointerY2;
let x = 0;
let y = 0;

drawFigure.addEventListener('click', () => {

    print();
});


function print() {
    colors.forEach(colors => {
        //circulo
        x = Math.max(30, Math.min(width - 30, Math.random() * width));
        y = Math.max(30, Math.min(height - 30, Math.random() * height));
        let circle = new Circle(x, y, colors[0], 30);
        circle.draw(ctx);
        figures.push(circle);

        //rectangulo
        x = Math.max(0, Math.min(width - 100, Math.random() * width));
        y = Math.max(0, Math.min(height - 50, Math.random() * height));
        let rectangle = new Rectangle(x, y, colors[1], 50, 100);
        rectangle.draw(ctx);
        figures.push(rectangle);

        //cuadrado
        x = Math.max(0, Math.min(width - 50, Math.random() * width));
        y = Math.max(0, Math.min(height - 50, Math.random() * height));
        let square = new Square(x, y, colors[2], 50);
        square.draw(ctx);
        figures.push(square);
    });
}
/*necesito esta validacion porque un mensaje puede interferir en la experiencia del usuario
cuando muestro un mensaje este mensaje puede poseer un estilo u aparecer en algun mensaje en pantalla(en el caso de alert)
lo que molestaria la interaccion con las otras funcionalidades como mover las figuras
*/
checkPointerInFigure.addEventListener('click', function () {
    pointerInFigure = true;
});
canvas.addEventListener('click', function (e) {
    message.innerText = "";
    pointerX = 0;
    pointerY = 0;
    if (pointerInFigure) {
        let rect = canvas.getBoundingClientRect();
        pointerX = e.layerX - rect.left;
        pointerY = e.layerY - rect.top;
        figures.forEach(figure => {
            if (figure.isPointerInside(pointerX, pointerY)) {
                message.innerText = "el cursor esta dentro de la figura";
            }
        });
    }
    pointerInFigure=false;
});


canvas.addEventListener('mousedown', function (e) {
    let rect = canvas.getBoundingClientRect();
    pointerX = e.layerX - rect.left;
    pointerY = e.layerY - rect.top;

    figures.forEach(figure => {
        if (figure.isPointerInside(pointerX, pointerY)) {
            selectFigure = figure;
            figureWASD = selectFigure;
            pointerX2 = pointerX - selectFigure.x;
            pointerY2 = pointerY - selectFigure.y;
            selectFigure.setStroke(ctx);
        }
    });
});
canvas.addEventListener('mousemove', function (e) {
    if (selectFigure) {
        let rect = canvas.getBoundingClientRect();
        pointerX = e.layerX - rect.left;
        pointerY = e.layerY - rect.top;

        selectFigure.x = pointerX - pointerX2;
        selectFigure.y = pointerY - pointerY2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        figures.forEach(figure => {
            figure.draw(ctx);
        });
    }

});
canvas.addEventListener('mouseup', function () {
    selectFigure = null;
});
//intente poniendo canvas.addEventListener, ya que primero para decidir que figura queres mover tenes que clikearle encima pero no funciono
document.addEventListener('keydown', function(e) {
    keyboard = e.key;
    if (figureWASD) {
        if (keyboard === 'ArrowUp' || keyboard == 'w' || keyboard == 'W') {
            figureWASD.y -= 10;
        } else if (keyboard === 'ArrowDown' || keyboard == 's' || keyboard == 'S') {
            figureWASD.y += 10;
        } else if (keyboard === 'ArrowLeft' || keyboard == 'a' || keyboard == 'A') {
            figureWASD.x -= 10;
        } else if (keyboard === 'ArrowRight' || keyboard == 'd' || keyboard == 'D') {
            figureWASD.x += 10;
        }

        ctx.clearRect(0, 0, width, height);
        figures.forEach(figure => {
            figure.draw(ctx);
        });
    }
});