
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

  var origMapSize = { x: 3400, y: 3800 };

  fps = 60;
  var now;
  var then = Date.now();
  var interval = 1000/fps;
  var delta;

  self.sprites = {
    'arlingtoncemetery.png': { pos: {x:500,y:500}},
    'rooseveltisland.png' : {pos: {x:0,y:0}}
  };

  self.resizeMap = function() {
    console.log('Resizing...');
    var aspectRatio = 7/6;
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

  self.width = window.innerWidth*0.9;
  var aspectRatio = 7/6;
  self.height = self.width / aspectRatio;
  self.scale = { x: self.width / origMapSize.x, y: self.height / origMapSize.y };
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

  self.addSprites = function() {
    _.forEach(self.sprites, function(s, key) {
      s.sprite = new PIXI.Sprite();
      s.sprite.texture = PIXI.Texture.fromFrame(key);
      s.sprite.scale.x = self.scale.x;
      s.sprite.scale.y = self.scale.y;
      s.sprite.anchor = new PIXI.Point(0.5, 0.5);
      s.sprite.position = new PIXI.Point(s.pos.x, s.pos.y);
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
  controller: function() {

    var MANAGER = new MapManager();
    console.log(MANAGER);
    MANAGER.init();

    return {
      drawMap: function (element, isInitialized, context) {

        if (isInitialized) {
          //console.log('Already initialized')
          //MANAGER.animate();
          return;
        }

        element.appendChild(MANAGER.renderer.view);
        MANAGER.animate();
      }
    };
  },
  view: function(controller) {
    return m(".container#mainContainer", [
      m(".row", [
        m(".col-lg-12", [
          m("h1", "DC Map"),
          m('#mapContainer', { config: controller.drawMap })
        ])
      ])
    ])
  }
};

var dcmetro = {
  controller: function() {
    return {};
  },
  view: function(controller) {
    return [
      m.component(Navbar, {}),
      m.component(DCMap, {})
    ]
  }
};

m.route(document.body, "/", {
  "/": dcmetro
});
