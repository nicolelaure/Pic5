if ( typeof(jQuery) != 'undefined' ){
    jQuery(function($){
        var canvas = $('canvas')[0];
        if (canvas.getContext('2d')) {
            var context = canvas.getContext('2d');
       
            //POTENTIAL IE SUPPORT
            //        var canvasDiv = document.getElementById('canvasDiv');
            //        canvas = document.createElement('canvas');
            //        canvas.setAttribute('width', canvasWidth);
            //        canvas.setAttribute('height', canvasHeight);
            //        canvas.setAttribute('id', 'canvas');
            //        canvasDiv.appendChild(canvas);
            //        if(typeof G_vmlCanvasManager != 'undefined') {
            //            canvas = G_vmlCanvasManager.initElement(canvas);
            //        }
            //        context = canvas.getContext("2d");
        
            $('#canvasInAPerfectWorld').mousedown(function(e){
                var mouseX = e.pageX - this.offsetLeft;
                var mouseY = e.pageY - this.offsetTop;
		paint = true;
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                redraw();
            });
        
            $('#canvasInAPerfectWorld').mousemove(function(e){
                if(paint){
                    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                    redraw();
                }
            });
            $('#canvasInAPerfectWorld').mouseup(function(e){
                paint = false;
            });
            $('#canvasInAPerfectWorld').mouseleave(function(e){
                paint = false;
            });
            var clickX = new Array();
            var clickY = new Array();
            var clickDrag = new Array();
            var paint;

            function addClick(x, y, dragging)
            {
                clickX.push(x);
                clickY.push(y);
                clickDrag.push(dragging);
            }
            function redraw(){
                canvas.width = canvas.width; // Clears the canvas
                context.strokeStyle = "#df4b26";
                context.lineJoin = "round";
                context.lineWidth = 5;
			
                for(var i=0; i < clickX.length; i++){		
                    context.beginPath();
                    if(clickDrag[i] && i){
                        context.moveTo(clickX[i-1], clickY[i-1]);
                    }else{
                        context.moveTo(clickX[i]-1, clickY[i]);
                    }
                    context.lineTo(clickX[i], clickY[i]);
                    context.closePath();
                    context.stroke();
                }
                sendDrawing();
            }
            function sendDrawing(){
            	var string = canvas.toDataURL("image/jpeg");
				console.log(string.length);
            }
        }
    });
};
