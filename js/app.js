function app() {
  return {
    activeTab: 'controls',
    shaR: 0.25,
    shaG: 0.25,
    shaB: 0.25,
    midR: 0.5,
    midG: 0.5,
    midB: 0.5,
    hiR: 0.75,
    hiG: 0.75,
    hiB: 0.75,
    exposure: 0,
    contrast: 0,
    init() {
      console.log('init');

      setTimeout(() => {


        // convert the image to a texture
        window.image = document.getElementById('image');
        window.texture = canvas.texture(image);

        window.preview = document.getElementById('preview');
        window.ctx = preview.getContext('2d');

        window.haldImg = document.getElementById('haldImg');
        window.haldTexture = canvas.texture(haldImg);

        window.haldPreview = document.getElementById('hald-canvas');
        window.haldCtx = haldPreview.getContext('2d');

        var myapp = this;
        setTimeout(() => {
          this.update();
        }, 500)

      }, 100)


    },
    update() {

      var red = [
        [0, 0],
        [0.25, this.shaR],
        [0.5, this.midR],
        [0.75, this.hiR],
        [1, 1]
      ];
      var green = [
        [0, 0],
        [0.25, this.shaG],
        [0.5, this.midG],
        [0.75, this.hiG],
        [1, 1]
      ];
      var blue = [
        [0, 0.3],
        [0.25, this.shaB],
        [0.5, this.midB],
        [0.75, this.hiB],
        [1, 1]
      ];

      // apply the filter
      canvas.draw(texture).curves(red, green, blue).brightnessContrast(this.exposure, this.contrast).update();
      ctx.drawImage(canvas, 0, 0);

      canvas.draw(haldTexture).curves(red, green, blue).brightnessContrast(this.exposure, this.contrast).update();
      haldCtx.drawImage(canvas, 0, 0);

    },
    randomize() {
      this.shaR = this.random(15);
      this.shaG = this.random(15);
      this.shaB = this.random(15);

      this.midR = this.random(40);
      this.midG = this.random(40);
      this.midB = this.random(40);

      this.hiR = this.random(65);
      this.hiG = this.random(65);
      this.hiB = this.random(65);

      this.update();
    },
    random(min) {
      let res = (Math.floor(Math.random() * 20) + min) / 100;
      return res.toFixed(2)
    },
    reset() {
      this.shaR = 0.25;
      this.shaG = 0.25;
      this.shaB = 0.25;

      this.midR = 0.5;
      this.midG = 0.5;
      this.midB = 0.5;

      this.hiR = 0.75;
      this.hiG = 0.75;
      this.hiB = 0.75;

      this.exposure = 0;
      this.contrast = 0;

      this.update();
    },
    saveImage() {
      let imagedata = preview.toDataURL('image/jpeg');
      console.log(imagedata);
      var a = document.createElement("a");
      a.href = imagedata;
      a.download = "Filmkit-Colorlab.jpg";
      a.click();
    }

  }
}