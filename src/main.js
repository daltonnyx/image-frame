// Initinize Canvas Object
const canvas = new fabric.Canvas("frame", {
    hoverCursor: 'pointer',
    selection: false
});
var patternSourceCanvas = new fabric.StaticCanvas();

var frame, framepoly, frameimage;

fabric.Image.fromURL('frames/frame1.png', img => {
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
        frameimage.scaleToHeight(canvas.getHeight());
        frameimage.initialScale = frameimage.getScaleY();
        canvas.remove(canvas._objects[0]);
        canvas.add(frameimage);
        canvas.renderAll();
    });
},false);

var zoom = document.getElementById('zoom');

zoom.addEventListener('change', zoomChangeHandler, false);

function zoomChangeHandler(evt) {
    var zoomValue = evt.target.value;
    var currentObject = canvas._objects[0];
    currentObject.scale(zoomValue / 100 * currentObject.initialScale);
    canvas.renderAll();
}

window.addEventListener('mousewheel', mouseWheelZoomHandler, false);
window.addEventListener('DOMMouseScroll', mouseWheelZoomHandler, false);

function mouseWheelZoomHandler(evt) {
    if(evt.target.nodeName != 'CANVAS') 
        return;
    if(evt.wheelDelta > 0 || evt.detail > 0) {
        if(zoom.value < 200) {
            zoom.value = parseInt(zoom.value) + 10;
        }
    }
    else {
        if(zoom.value > 10) {
            zoom.value -= 10;
        }
    }
    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change',true,true);
    zoom.dispatchEvent(changeEvent);
};


var saveButton = document.getElementById('save');

saveButton.addEventListener('click',evt => {
    evt.preventDefault();
    var dataURL = canvas.toDataURL({
        format: 'png'
    });
    var downloadAnchor = document.createElement('A');
    downloadAnchor.download = "image-frame.png";
    downloadAnchor.href = dataURL;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
},false);



//Change frame

var frameArr = document.querySelectorAll("#frame-container ul li a");

frameArr.forEach(link => {link.addEventListener("click", changeFrameHandler, false)});


function changeFrameHandler(evt) {
    evt.preventDefault();
    var frameSrc = this.getAttribute("data-src");
    fabric.Image.fromURL(frameSrc, img => {
        frame = img;
        frame.scaleToHeight(canvas.getHeight());
        canvas.setWidth(frame.getWidth());
        canvas.setOverlayImage(frame, canvas.renderAll.bind(canvas));   
    });
}
