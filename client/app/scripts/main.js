
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

  self.stations = {
    "Metro Center": {
      "Code": "C01",
      "Name": "Metro Center",
      "StationTogether1": "A01",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.898303,
      "Lon": -77.028099,
      "Address": {
        "Street": "607 13th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20005"
      },
      "Type": "large",
      "pos": { x: 1787, y: 1349}
    }
  };

  var Stations = [
    {
      "Code": "C02",
      "Name": "McPherson Square",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.901316,
      "Lon": -77.033652,
      "Address": {
        "Street": "1400 I St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20005"
      }
    },
    {
      "Code": "C03",
      "Name": "Farragut West",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.901311,
      "Lon": -77.03981,
      "Address": {
        "Street": "900 18th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20006"
      }
    },
    {
      "Code": "C04",
      "Name": "Foggy Bottom-GWU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.900599,
      "Lon": -77.050273,
      "Address": {
        "Street": "2301 I St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20037"
      }
    },
    {
      "Code": "C05",
      "Name": "Rosslyn",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.896595,
      "Lon": -77.07146,
      "Address": {
        "Street": "1850 N. Moore Street",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22209"
      }
    },
    {
      "Code": "D01",
      "Name": "Federal Triangle",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.893757,
      "Lon": -77.028218,
      "Address": {
        "Street": "302 12th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20004"
      }
    },
    {
      "Code": "D02",
      "Name": "Smithsonian",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.888022,
      "Lon": -77.028232,
      "Address": {
        "Street": "1200 Independence Avenue SW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20004"
      }
    },
    {
      "Code": "D03",
      "Name": "L'Enfant Plaza",
      "StationTogether1": "F03",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.884775,
      "Lon": -77.021964,
      "Address": {
        "Street": "600 Maryland Avenue SW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20024"
      }
    },
    {
      "Code": "D04",
      "Name": "Federal Center SW",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.884958,
      "Lon": -77.01586,
      "Address": {
        "Street": "401 3rd Street SW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20024"
      }
    },
    {
      "Code": "D05",
      "Name": "Capitol South",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.884968,
      "Lon": -77.005137,
      "Address": {
        "Street": "355 First Street SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      }
    },
    {
      "Code": "D06",
      "Name": "Eastern Market",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.884124,
      "Lon": -76.995334,
      "Address": {
        "Street": "701 Pennsylvania Avenue SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      }
    },
    {
      "Code": "D07",
      "Name": "Potomac Ave",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.880841,
      "Lon": -76.985721,
      "Address": {
        "Street": "700 14th Street SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      }
    },
    {
      "Code": "D08",
      "Name": "Stadium-Armory",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.88594,
      "Lon": -76.977485,
      "Address": {
        "Street": "192 19th St. SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      }
    },
    {
      "Code": "D09",
      "Name": "Minnesota Ave",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.898284,
      "Lon": -76.948042,
      "Address": {
        "Street": "4000 Minnesota Avenue NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20019"
      }
    },
    {
      "Code": "D10",
      "Name": "Deanwood",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.907734,
      "Lon": -76.936177,
      "Address": {
        "Street": "4720 Minnesota Avenue NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20019"
      }
    },
    {
      "Code": "D11",
      "Name": "Cheverly",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.91652,
      "Lon": -76.915427,
      "Address": {
        "Street": "5501 Columbia Park",
        "City": "Cheverly",
        "State": "MD",
        "Zip": "20785"
      }
    },
    {
      "Code": "D12",
      "Name": "Landover",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.934411,
      "Lon": -76.890988,
      "Address": {
        "Street": "3000 Pennsy Drive",
        "City": "Hyattsville",
        "State": "MD",
        "Zip": "20785"
      }
    },
    {
      "Code": "D13",
      "Name": "New Carrollton",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.947674,
      "Lon": -76.872144,
      "Address": {
        "Street": "4700 Garden City Drive",
        "City": "New Carrollton",
        "State": "MD",
        "Zip": "20784"
      }
    },
    {
      "Code": "K01",
      "Name": "Court House",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.891499,
      "Lon": -77.08391,
      "Address": {
        "Street": "2100 Wilson Blvd",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
      }
    },
    {
      "Code": "K02",
      "Name": "Clarendon",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.886373,
      "Lon": -77.096963,
      "Address": {
        "Street": "3100 Wilson Blvd",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
      }
    },
    {
      "Code": "K03",
      "Name": "Virginia Square-GMU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.88331,
      "Lon": -77.104267,
      "Address": {
        "Street": "3600 Fairfax Drive",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
      }
    },
    {
      "Code": "K04",
      "Name": "Ballston-MU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.882071,
      "Lon": -77.111845,
      "Address": {
        "Street": "4230 Fairfax Drive",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
      }
    },
    {
      "Code": "K05",
      "Name": "East Falls Church",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.885841,
      "Lon": -77.157177,
      "Address": {
        "Street": "2001 N. Sycamore St.",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22205"
      }
    },
    {
      "Code": "K06",
      "Name": "West Falls Church-VT/UVA",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.90067,
      "Lon": -77.189394,
      "Address": {
        "Street": "7040 Haycock Road",
        "City": "Falls Church",
        "State": "VA",
        "Zip": "22043"
      }
    },
    {
      "Code": "K07",
      "Name": "Dunn Loring-Merrifield",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.883015,
      "Lon": -77.228939,
      "Address": {
        "Street": "2700 Gallows Road",
        "City": "Vienna",
        "State": "VA",
        "Zip": "22180"
      }
    },
    {
      "Code": "K08",
      "Name": "Vienna/Fairfax-GMU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.877693,
      "Lon": -77.271562,
      "Address": {
        "Street": "9550 Saintsbury Drive",
        "City": "Fairfax",
        "State": "VA",
        "Zip": "22031"
      }
    }
  ]

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

  self.background = new PIXI.Container();
  self.stage.addChild(self.background);
  self.foreground = new PIXI.Container();
  self.stage.addChild(self.foreground);

  var backgroundMap = new PIXI.Sprite.fromImage('../images/mapCropped.png');
  backgroundMap.scale.x = self.scale.x;
  backgroundMap.scale.y = self.scale.y;
  self.background.addChild(backgroundMap);

  self.renderer.render(self.stage);

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

  self.addStationSprites = function() {
    _.forEach(self.stations, function(s, key) {
      console.log('Drawing station sprite for ' + key);
      s.sprite = new PIXI.Sprite();
      var stationSprite;
      if(s.Type == "large") {
        console.log('Large station');
        stationSprite = "stationlarge.png";
      }
      s.sprite.texture = PIXI.Texture.fromFrame(stationSprite);
      s.sprite.scale.x = self.scale.x;
      s.sprite.scale.y = self.scale.y;
      s.sprite.anchor = new PIXI.Point(0.5, 0.5);
      var sx = s.pos.x * (self.width/origMapSize.x);
      var sy = s.pos.y * (self.height/origMapSize.y);
      s.sprite.position = new PIXI.Point(sx, sy);
      console.log('Adding listeners');
      s.sprite.interactive = true;
      s.sprite.buttonMode = true;
      s.sprite
        .on('mouseover', self.onStationMouseOver)
        .on('mouseout', self.onStationMouseOut);
      self.foreground.addChild(s.sprite);
    })
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
      self.foreground.addChild(s.sprite);
    })
  };

  self.onLoaded = function() {
    console.log('Assets loaded');
    self.addStationSprites();
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
