if ( typeof(jQuery) != 'undefined' ){
    jQuery(function($){
        var canvas = $('canvas')[0];
        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var paint;
        var timer = 30000;
        var user = 'georgi';
        
        
        if (canvas.getContext('2d')) {
            var context = canvas.getContext('2d');
        }else{
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
        
        }
        $('canvas').mousedown(function(e){
            
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        });
        
        $('canvas').mousemove(function(e){
            if(paint){
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
            }
        });
        $('canvas').mouseup(function(e){
            paint = false;
        });
        $('canvas').mouseleave(function(e){
            paint = false;
        });
        
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
        function clearCanvas(){
            clickX = [];
            clickY = [];
            clickDrag = [];
            context.fillStyle = '#ffffff'; // Work around for Chrome
            context.fillRect(0, 0, canvas.width, canvas.height); // Fill in the canvas with white
            canvas.width = canvas.width; // clears the canvas 
        }
        function sendDrawing(){
            var string = canvas.toDataURL("image/jpeg");
            console.log(string.length);
        }
        $('.canvas_clear').click(function(){
            clearCanvas();
            console.log(pictureOptions());
        })
        //ARRAY OF PICTURE OPTIONS
        function pictureOptions(){
            var pictureOptions = new Array(
                'cat',
                'apple',
                'boat',
                'ring',
                'dog',
                'rabbit');
            return pictureOptions;
        }
        function timeUp(){
            $('.timer').append('TIME IS UP!');
        }
//        if(user == $('.players .active .name').html()){
    //                var timeset = setTimeout("timeUp()",timer);
    //                $('.timer').append(timeset);
    //            }
    });
};
    