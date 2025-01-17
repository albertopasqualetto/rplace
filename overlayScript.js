
function setupOverlay(background,foreground,X_IN_PLACE,Y_IN_PLACE,templateImg) {

    const X_PIXELS = 23;
    const Y_PIXELS = 23;
    const X_OFFSET = 400;
    const Y_OFFSET = 100;
    
    
    function getMousePos(canvas, evt) {
      const rect = canvas.getBoundingClientRect();
      return {
        x:
          ((evt.clientX - rect.left - 20) / (rect.right - rect.left)) *
          canvas.width,
        y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
      };
    }
    
    function drawGrid(x_0, y_0, x_max, y_max, ctx) {
      for (let x = x_0; x <= x_max; x += X_PIXELS) {
        ctx.moveTo(x, y_0);
        ctx.lineTo(x, y_max);
        for (let y = y_0; y <= y_max; y += Y_PIXELS) {
          ctx.moveTo(x_0, y);
          ctx.lineTo(x_max, y);
        }
      }
      ctx.strokeStyle = "#bbbbbb";
      ctx.stroke();
    }
    
    const bg = background.getContext("2d");
    
    const fg = foreground.getContext("2d");
    
    const img = new Image();
    img.onload = function () {
      w = img.width * X_PIXELS;
      h = img.height * Y_PIXELS;
    
      bg.canvas.width = w + X_OFFSET;
      bg.canvas.height = h + 2 * Y_OFFSET;
    
      fg.canvas.width = bg.canvas.width;
      fg.canvas.height = bg.canvas.height;
      bg.imageSmoothingEnabled = false;
      bg.drawImage(img, 0, 0, img.width, img.height, 0, Y_OFFSET, w, h);
      drawGrid(0, Y_OFFSET, w, h + Y_OFFSET, bg);
    };
    img.src = templateImg;
    
    function drawText(text, x, y) {
      fg.font = "80px Sans-serif";
      fg.strokeStyle = "black";
      fg.lineWidth = 8;
      fg.strokeText(text, x, y);
      fg.fillStyle = "white";
      fg.fillText(text, x, y);
    }
    
    foreground.addEventListener("mousemove", (event) => {
      let p = getMousePos(foreground, event);
      let x = Math.floor(p.x / X_PIXELS);
      let y = Math.floor((p.y - Y_OFFSET) / Y_PIXELS);
      fg.clearRect(0, 0, fg.canvas.width, fg.canvas.height);
      drawText(x + X_IN_PLACE + "", p.x + 40, p.y - 30);
      drawText(y + Y_IN_PLACE + "", p.x + 40, p.y + 50);
    
      fg.lineWidth = 4;
      let circle_x = x * X_PIXELS + X_PIXELS / 2;
      let circle_y = y * Y_PIXELS + Y_OFFSET + Y_PIXELS / 2;
      fg.beginPath();
      fg.strokeStyle = "red";
      fg.arc(circle_x, circle_y, X_PIXELS - 6, 0, 2 * Math.PI, false);
      fg.stroke();
    
      fg.beginPath();
      fg.strokeStyle = "white";
      fg.arc(circle_x, circle_y, X_PIXELS - 4, 0, 2 * Math.PI, false);
      fg.stroke();
    
      fg.beginPath();
      fg.strokeStyle = "black";
      fg.arc(circle_x, circle_y, X_PIXELS, 0, 2 * Math.PI, false);
      fg.stroke();
    });
    
    foreground.addEventListener("click", (event) => {
      let p = getMousePos(foreground, event);
      let x = Math.floor(p.x / X_PIXELS) + X_IN_PLACE;
      let y = Math.floor((p.y - Y_OFFSET) / Y_PIXELS) + Y_IN_PLACE;
      let url = "https://new.reddit.com/r/place/?cx=" + x + "&cy=" + y + "&px=23";
      window.open(url, "_blank").focus();
    });
    
    
}