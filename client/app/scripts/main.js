
var Fahrt = {};

var MapManager = function() {

  var self = this;

  var fpsStats = new Stats();
  fpsStats.setMode(0);
  fpsStats.domElement.style.position = 'absolute';
  fpsStats.domElement.style.left = '0px';
  fpsStats.domElement.style.top = '50px';
  document.body.appendChild( fpsStats.domElement );

  var msStats = new Stats();
  msStats.setMode(1);
  msStats.domElement.style.position = 'absolute';
  msStats.domElement.style.left = '80px';
  msStats.domElement.style.top = '50px';
  document.body.appendChild( msStats.domElement );

  var mbStats = new Stats();
  mbStats.setMode(2);
  mbStats.domElement.style.position = 'absolute';
  mbStats.domElement.style.left = '160px';
  mbStats.domElement.style.top = '50px';
  document.body.appendChild( mbStats.domElement );

  var origMapSize = { x: 3400, y: 2914 };

  fps = 60;
  var now;
  var then = Date.now();
  var interval = 1000/fps;
  var delta;
  var MOUSE_OVER_SCALE_RATIO = 1.5;

  var aspectRatio = 7/6;
  self.width = window.innerWidth*0.9;
  self.height = self.width / aspectRatio;
  self.scale = { x: self.width / origMapSize.x, y: self.height / origMapSize.y };

  self.sprites = {
    /*
    'waterbottom': { pos: {x:1900,y:2400}, frame: 'waterbottom.png'},
    'waterleft': { pos: {x:1000,y:1300}, frame: 'waterleft.png'},
    'waterright': { pos: {x:2400,y:1500}, frame: 'waterright.png'},
    'arlingtoncemetery': { pos: {x:1380,y:1720}, frame: 'arlingtoncemetery.png'},
    'rooseveltisland': {pos: {x:1350,y:1300}, frame: 'rooseveltisland.png'},
    'orangeline': {pos: {x:1700,y:1400}, frame: 'lineorange.png'},
    'silverline': {pos: {x:1630,y:1265}, frame: 'linesilver.png'},
    'Rosslyn': {pos: {x:1200,y:1500}, frame: 'stationlarge.png', type: 'station'}
  */
  };

  self.resizeMap = function() {
    console.log('Resizing...');
    self.width = window.innerWidth*0.9;
    self.height = self.width / aspectRatio;
    self.scale = { x: self.width / origMapSize.x, y: self.height / origMapSize.y };
    console.log('scale:');
    console.log(self.scale);

    if(self.renderer) {
      self.renderer.view.style.width = self.width+'px';
      self.renderer.view.style.height = self.height+'px';
    }
  };

  window.addEventListener('resize', self.resizeMap, false);
  window.addEventListener('orientationchange', self.resizeMap, false);

  self.resizeMap();
  console.log('scale:');
  console.log(self.scale);

  self.renderer = PIXI.autoDetectRenderer(self.width, self.height, {backgroundColor : 0xFFFFFF});

  self.stage = new PIXI.Container();
  self.stage.name = 'stage';
  self.stage.selected = null;
  self.stage.clickedOnlyStage = true;
  self.stage.interactive = true;
  self.stage.on('mouseup', function() {
    if(self.stage.clickedOnlyStage) {
      console.log('Found stage click');
      if(self.stage.selected) {
        console.log(self.stage.selected);
        self.stage.selected.filters = null;
        self.stage.selected = null;
      }
    }
    else {
      self.stage.clickedOnlyStage = true;
    }
  });

  self.stage.MANAGER = self;

  self.animate = function(time) {

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      fpsStats.begin();
      msStats.begin();
      mbStats.begin();

      then = now - (delta % interval);

      TWEEN.update(time);
      self.renderer.render(self.stage);

      fpsStats.end();
      msStats.end();
      mbStats.end();
    }

    requestAnimationFrame(self.animate);
  };

  self.onStationMouseOver = function() {
    console.log('Moused over!');
    this.scale.set(this.scale.x*MOUSE_OVER_SCALE_RATIO);

    var global = this.toGlobal(this.position);

    this.tooltip = new PIXI.Graphics();
    this.tooltip.lineStyle(3, 0x0000FF, 1);
    this.tooltip.beginFill(0x000000, 1);
    //self.draw.moveTo(x,y);
    this.tooltip.drawRoundedRect(0+20,-self.height,200,100,10);
    this.tooltip.endFill();
    this.tooltip.textStyle = {
      font : 'bold italic 28px Arial',
      fill : '#F7EDCA',
      stroke : '#4a1850',
      strokeThickness : 5,
      dropShadow : true,
      dropShadowColor : '#000000',
      dropShadowAngle : Math.PI / 6,
      dropShadowDistance : 6,
      wordWrap : true,
      wordWrapWidth : 440
    };

    this.tooltip.text = new PIXI.Text('Test',this.tooltip.textStyle);
    this.tooltip.text.x = 0+30;
    this.tooltip.text.y = -this.height;

    new TWEEN.Tween(this.tooltip)
      .to({x:this.width},700)
      .easing( TWEEN.Easing.Elastic.InOut )
      .start();
    new TWEEN.Tween(this.tooltip.text)
      .to({x:this.width+20},700)
      .easing( TWEEN.Easing.Elastic.InOut )
      .start();

    console.log('Adding tooltip');
    this.addChild(this.tooltip);

    this.addChild(this.tooltip.text);
  };

  self.onStationMouseOut = function() {
    console.log('Moused out!');
    this.scale.set(this.scale.x/MOUSE_OVER_SCALE_RATIO);

    this.removeChild(this.tooltip);
    this.removeChild(this.tooltip.text);
  };

  self.addSprites = function() {
    _.forEach(self.sprites, function(s, key) {
      s.sprite = new PIXI.Sprite();
      s.sprite.texture = PIXI.Texture.fromFrame(s.frame);
      s.sprite.scale.x = self.scale.x;
      s.sprite.scale.y = self.scale.y;
      s.sprite.anchor = new PIXI.Point(0.5, 0.5);
      var sx = s.pos.x * (self.width/origMapSize.x);
      var sy = s.pos.y * (self.height/origMapSize.y);
      s.sprite.position = new PIXI.Point(sx, sy);
      if(s.type == 'station') {
        console.log('Adding listeners');
        s.sprite.interactive = true;
        s.sprite.buttonMode = true;
        s.sprite
          .on('mouseover', self.onStationMouseOver)
          .on('mouseout', self.onStationMouseOut);
      }
      self.stage.addChild(s.sprite);
    })
  };

  self.onLoaded = function() {
    console.log('Assets loaded');
    self.addSprites();
  };

  self.init = function() {
    PIXI.loader
    .add('../images/spriteatlas.json')
    .load(self.onLoaded);
  };

};

var Navbar ={
  controller: function() {
    return {};
  },
  view: function(controller) {
    return m("nav.navbar.navbar-inverse.navbar-fixed-top", [
      m(".container", [
        m(".navbar-header", [
          m("a.navbar-brand[href='#']", "Project name")
        ]),
        m(".collapse.navbar-collapse[id='navbar']", [
          m("ul.nav.navbar-nav", [
            m("li.active", [m("a[href='#']", "Home")]),
            m("li", [m("a[href='#about']", "About")]),
            m("li", [m("a[href='#contact']", "Contact")])
          ])
        ])
      ])
    ])
  }
};

var DCMap = {
  controller: function(args) {

    console.log('args');
    console.log(args.railPredictions());
    console.log(args.railPredictions().timestamp);

    var MANAGER = new MapManager();
    console.log(MANAGER);
    MANAGER.init();

    return {
      drawMap: function (element, isInitialized, context) {

        if (isInitialized) {
          return;
        }

        console.log('Drawing!');
        element.appendChild(MANAGER.renderer.view);
        MANAGER.animate();
      },
      railPredictions: args.railPredictions
    };
  },
  view: function(controller) {
    return m(".container#mainContainer", [
      m(".row", [
        m(".col-lg-12", [
          m("h1", "DC Map"),
          m('#mapContainer', { config: controller.drawMap }),
          m('#railPredictions', controller.railPredictions().timestamp)
        ])
      ])
    ])
  }
};

var railPredictions = m.prop({});

(function refreshPredictions() {
  console.log('Updating...');
  m
    .request({
    method: "GET",
    url: "https://s3.amazonaws.com/cache.dcfahrt.com/dcrailprediction.json"
  })
    .then(railPredictions)
    .then(setTimeout(refreshPredictions, 5000));
})();

var dcmetro = {
  controller: function() {
    return {
      railPredictions: railPredictions
    };
  },
  view: function(controller) {
    return [
      m.component(Navbar, {}),
      m.component(DCMap, {railPredictions: controller.railPredictions})
    ]
  }
};

m.route(document.body, "/", {
  "/": dcmetro
});
