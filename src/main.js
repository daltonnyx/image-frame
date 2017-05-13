// Initinize Canvas Object
const canvas = new fabric.Canvas("frame", {
    hoverCursor: 'pointer',
    selection: false
});
var patternSourceCanvas = new fabric.StaticCanvas();

var frame, framepoly, frameimage;

fabric.Image.fromURL('frames/9991083f64f4a3f7d53719b16e5cba68.png', img => {
    frame = img;
    frame.scaleToHeight(canvas.getHeight());
    canvas.setWidth(frame.getWidth());
    canvas.setOverlayImage(frame, canvas.renderAll.bind(canvas));   
});




var upload = document.getElementById('upload');

upload.addEventListener('change',handleFileChanged, false);

function handleFileChanged(evt) {
    var image = evt.target.files[0];
    if(!image.type.match('image.*'))
    {
        alert('Not an image!');
        return;
    }
    reader.readAsDataURL(image);
    
}
//Read file and add to canvas
var reader = new FileReader();
    
reader.addEventListener('load',(file) => {
    if(!fabric) {
        alert('cannot load Fabric');
    }
    if(!canvas) {
        alert("canvas is not loaded");
    }
    fabric.Image.fromURL(reader.result, (img) => {
        frameimage = img;
        canvas.add(frameimage);
        canvas.renderAll();
    });
},false);



