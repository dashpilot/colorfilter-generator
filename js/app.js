window.onload = function() {
  // try to create a WebGL canvas (will fail if WebGL isn't supported)
  try {
    var canvas = fx.canvas();
  } catch (e) {
    alert(e);
    return;
  }

  // convert the image to a texture
  const image = document.getElementById('image');
  const texture = canvas.texture(image);

  const preview = document.getElementById('preview');
  const ctx = preview.getContext('2d');

  const shaR = document.querySelector('#shaR');
  const shaG = document.querySelector('#shaG');
  const shaB = document.querySelector('#shaB');

  const midR = document.querySelector('#midR');
  const midG = document.querySelector('#midG');
  const midB = document.querySelector('#midB');

  const hiR = document.querySelector('#hiR');
  const hiG = document.querySelector('#hiG');
  const hiB = document.querySelector('#hiB');

  const exposure = document.querySelector('#exposure');
  const contrast = document.querySelector('#contrast');

  function update() {


    var red = [
      [0, 0],
      [0.25, shaR.value],
      [0.5, midR.value],
      [0.75, hiR.value],
      [1, 1]
    ];
    var green = [
      [0, 0],
      [0.25, shaG.value],
      [0.5, midG.value],
      [0.75, hiG.value],
      [1, 1]
    ];
    var blue = [
      [0, 0.3],
      [0.25, shaB.value],
      [0.5, midB.value],
      [0.75, hiB.value],
      [1, 1]
    ];

    // apply the filter
    canvas.draw(texture).curves(red, green, blue).brightnessContrast(exposure.value, contrast.value).update();

    ctx.drawImage(canvas, 0, 0);

    // replace the image with the canvas
    //image.parentNode.insertBefore(canvas, image);
    //image.parentNode.removeChild(image);
  }

  document.querySelectorAll('input[type="range"]').forEach(function(el) {

    el.addEventListener('input', function() {

      update();
    })

  })

  document.querySelector('#randomize').addEventListener('click', function() {


    shaR.value = random(0);
    shaG.value = random(0);
    shaB.value = random(0);

    midR.value = random(25);
    midG.value = random(25);
    midB.value = random(25);

    hiR.value = random(50);
    hiG.value = random(50);
    hiB.value = random(50);


    update();

  })

  document.querySelector('#reset').addEventListener('click', function() {


    shaR.value = 0.25;
    shaG.value = 0.25;
    shaB.value = 0.25;

    midR.value = 0.5;
    midG.value = 0.5;
    midB.value = 0.5;

    hiR.value = 0.75;
    hiG.value = 0.75;
    hiB.value = 0.75;

    exposure.value = 0;
    contrast.value = 0;

    update();

  })

  document.getElementById('fileInput').addEventListener('change', function(e) {

    var width = 800;
    var imgUpload = new Image();
    imgUpload.onload = function() {
      var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d"),
        oc = document.createElement('canvas'),
        octx = oc.getContext('2d');
      canvas.width = width; // destination canvas size
      canvas.height = canvas.width * imgUpload.height / imgUpload.width;
      var cur = {
        width: Math.floor(imgUpload.width * 0.5),
        height: Math.floor(imgUpload.height * 0.5)
      }
      oc.width = cur.width;
      oc.height = cur.height;
      octx.drawImage(imgUpload, 0, 0, cur.width, cur.height);
      while (cur.width * 0.5 > width) {
        cur = {
          width: Math.floor(cur.width * 0.5),
          height: Math.floor(cur.height * 0.5)
        };
        octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
      }
      ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
      var base64Image = canvas.toDataURL('image/jpeg')

      console.log(base64Image);

      document.getElementById('image').src = base64Image;

      setTimeout(function() {
        texture.loadContentsOf(image);
        update();
      }, 100)

    }
    imgUpload.src = URL.createObjectURL(e.target.files[0]);
  });

  document.getElementById('choose-image').addEventListener('click', function(e) {
    document.getElementById('fileInput').click();
  });

  update();

};

function random(min) {
  let res = (Math.floor(Math.random() * 25) + min) / 100;
  return res.toFixed(2)
}