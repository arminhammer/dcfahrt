
var Fahrt = {};

var MapManager = function() {

  var map = this;

  var fpsStats = new Stats();
  fpsStats.setMode(0);
  fpsStats.domElement.style.position = 'absolute';
  fpsStats.domElement.style.left = '0px';
  fpsStats.domElement.style.top = '2000px';
  document.body.appendChild( fpsStats.domElement );

  var msStats = new Stats();
  msStats.setMode(1);
  msStats.domElement.style.position = 'absolute';
  msStats.domElement.style.left = '80px';
  msStats.domElement.style.top = '2000px';
  document.body.appendChild( msStats.domElement );

  var mbStats = new Stats();
  mbStats.setMode(2);
  mbStats.domElement.style.position = 'absolute';
  mbStats.domElement.style.left = '160px';
  mbStats.domElement.style.top = '2000px';
  document.body.appendChild( mbStats.domElement );

  var origMapSize = { x: 3400, y: 2914 };

  fps = 60;
  var now;
  var then = Date.now();
  var interval = 1000/fps;
  var delta;
  var MOUSE_OVER_SCALE_RATIO = 1.5;

  var aspectRatio = 7/6;
  map.width = window.innerWidth*0.9;
  map.height = map.width / aspectRatio;
  map.scale = { x: map.width / origMapSize.x, y: map.height / origMapSize.y };

  map.sprites = {
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

  map.stations = {
    "Vienna/Fairfax-GMU": {
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
      },
      "Type": "small",
      "pos": { x: 419, y: 1442},
      "trains": []
    },
    "Dunn Loring-Merrifield": {
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
      },
      "Type": "small",
      "pos": { x: 522, y: 1442},
      "trains": []
    },
    "West Falls Church-VT/UVA": {
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
      },
      "Type": "small",
      "pos": { x: 624, y: 1442},
      "trains": []
    },
    "East Falls Church": {
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
      },
      "Type": "large",
      "pos": { x: 759, y: 1467},
      "trains": []
    },
    "Ballston-MU": {
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
      },
      "Type": "small",
      "pos": { x: 859, y: 1467 },
      "trains": []
    },
    "Virginia Square-GMU": {
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
      },
      "Type": "small",
      "pos": { x: 934, y: 1467 },
      "trains": []
    },
    "Clarendon": {
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
      },
      "Type": "small",
      "pos": { x: 1011, y: 1467 },
      "trains": []
    },
    "Court House": {
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
      },
      "Type": "small",
      "pos": { x: 1087, y: 1467 },
      "trains": []
    },
    "Rosslyn": {
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
      },
      "Type": "large",
      "pos": { x: 1201, y: 1355},
      "trains": []
    },
    "Foggy Bottom-GWU": {
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
      },
      "Type": "small",
      "pos": { x: 1467, y: 1205},
      "trains": []
    },
    "Farragut West": {
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
      },
      "Type": "small",
      "pos": { x: 1551, y: 1205},
      "trains": []
    },
    "McPherson Square": {
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
      },
      "Type": "small",
      "pos": { x: 1702, y: 1205},
      "trains": []
    },
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
      "pos": { x: 1787, y: 1349},
      "trains": []
    },
    "Federal Triangle": {
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
      },
      "Type": "small",
      "pos": { x: 1787, y: 1458},
      "trains": []
    },
    "Smithsonian": {
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
      },
      "Type": "small",
      "pos": { x: 1787, y: 1540},
      "trains": []
    },
    "L'Enfant Plaza": {
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
      },
      "Type": "large",
      "pos": { x: 2000, y: 1629},
      "trains": []
    },
    "Federal Center SW": {
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
      },
      "Type": "small",
      "pos": { x: 2126, y: 1629},
      "trains": []
    },
    "Capitol South": {
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
      },
      "Type": "small",
      "pos": { x: 2234, y: 1629},
      "trains": []
    },
    "Eastern Market": {
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
      },
      "Type": "small",
      "pos": { x: 2335, y: 1610},
      "trains": []
    },
    "Potomac Ave": {
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
      },
      "Type": "small",
      "pos": { x: 2392, y: 1552},
      "trains": []
    },
    "Stadium-Armory": {
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
      },
      "Type": "large",
      "pos": { x: 2511, y: 1526},
      "trains": []
    },
    "Minnesota Ave": {
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
      },
      "Type": "small",
      "pos": { x: 2707, y: 1449},
      "trains": []
    },
    "Deanwood": {
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
      },
      "Type": "small",
      "pos": { x: 2772, y: 1386},
      "trains": []
    },
    "Cheverly": {
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
      },
      "Type": "small",
      "pos": { x: 2835, y: 1321},
      "trains": []
    },
    "Landover": {
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
      },
      "Type": "small",
      "pos": { x: 2899, y: 1257 },
      "trains": []
    },
    "New Carrollton": {
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
      },
      "Type": "small",
      "pos": { x: 2964, y: 1193},
      "trains": []
    }
  };

  map.resizeMap = function() {
    console.log('Resizing...');
    map.width = window.innerWidth*0.9;
    map.height = map.width / aspectRatio;
    map.scale = { x: map.width / origMapSize.x, y: map.height / origMapSize.y };
    console.log('scale:');
    console.log(map.scale);

    if(map.renderer) {
      map.renderer.view.style.width = map.width+'px';
      map.renderer.view.style.height = map.height+'px';
    }
  };

  window.addEventListener('resize', map.resizeMap, false);
  window.addEventListener('orientationchange', map.resizeMap, false);

  map.resizeMap();
  console.log('scale:');
  console.log(map.scale);

  map.renderer = PIXI.autoDetectRenderer(map.width, map.height, {backgroundColor : 0xFFFFFF});

  map.stage = new PIXI.Container();
  map.stage.name = 'stage';
  map.stage.selected = null;
  map.stage.clickedOnlyStage = true;
  map.stage.interactive = true;
  map.stage.on('mouseup', function() {
    if(map.stage.clickedOnlyStage) {
      console.log('Found stage click');
      if(map.stage.selected) {
        console.log(map.stage.selected);
        map.stage.selected.filters = null;
        map.stage.selected = null;
      }
    }
    else {
      map.stage.clickedOnlyStage = true;
    }
  });

  map.stage.MANAGER = map;

  map.background = new PIXI.Container();
  map.stage.addChild(map.background);
  map.foreground = new PIXI.Container();
  map.stage.addChild(map.foreground);

  map.trainContainer = new PIXI.Container();
  map.foreground.addChild(map.trainContainer);
  map.stationContainer = new PIXI.Container();
  map.foreground.addChild(map.stationContainer);
  map.tooltipContainer = new PIXI.Container();
  map.foreground.addChild(map.tooltipContainer);

  var backgroundMap = new PIXI.Sprite.fromImage('../images/mapCropped.png');
  backgroundMap.scale.x = map.scale.x;
  backgroundMap.scale.y = map.scale.y;
  map.background.addChild(backgroundMap);

  //map.renderer.render(map.stage);

  map.animate = function(time) {

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      fpsStats.begin();
      msStats.begin();
      mbStats.begin();

      then = now - (delta % interval);

      TWEEN.update(time);
      map.renderer.render(map.stage);

      fpsStats.end();
      msStats.end();
      mbStats.end();
    }

    requestAnimationFrame(map.animate);
  };

  map.onStationMouseOver = function() {
    console.log('Moused over!');
    console.log(this);
    this.scale.set(this.scale.x*MOUSE_OVER_SCALE_RATIO);

    this.tooltip = new PIXI.Graphics();
    this.tooltip.lineStyle(3, 0x000000, 1);
    this.tooltip.beginFill(0xFFFFFF, 1);
    //self.draw.moveTo(x,y);
    this.tooltip.drawRoundedRect(this.x,this.y,400,40+(map.stations[this.name].trains.length*40),10);
    this.tooltip.endFill();
    this.tooltip.textStyle = {
      font : '28px Arial',
      fill : '#000000',
      stroke : '#4a1850',
      strokeThickness : 0,
      wordWrap : true,
      wordWrapWidth : 380
    };

    var text = this.name+'\n';
    map.stations[this.name].trains.forEach(function(train) {
      text+=train.Destination+'  '+train.Min+'\n';
    });
    console.log('Text:');
    console.log(text);
    this.tooltip.text = new PIXI.Text(text,this.tooltip.textStyle);
    this.tooltip.text.x = this.x+5;
    this.tooltip.text.y = this.y+5;

    new TWEEN.Tween(this.tooltip)
      .to({x:this.tooltip.x+30},200)
      .easing( TWEEN.Easing.Elastic.InOut )
      .start();
    new TWEEN.Tween(this.tooltip.text)
      .to({x:this.x+35},200)
      .easing( TWEEN.Easing.Elastic.InOut )
      .start();

    console.log('Adding tooltip');
    map.tooltipContainer.addChild(this.tooltip);
    map.tooltipContainer.addChild(this.tooltip.text);
  };

  map.onStationMouseOut = function() {
    console.log('Moused out!');
    this.scale.set(this.scale.x/MOUSE_OVER_SCALE_RATIO);

    map.tooltipContainer.removeChild(this.tooltip);
    map.tooltipContainer.removeChild(this.tooltip.text);
  };

  map.addStationSprites = function() {
    _.forEach(map.stations, function(s, key) {
      //console.log('Drawing station sprite for ' + key);
      s.sprite = new PIXI.Sprite();
      s.Type === "large" ? s.sprite.texture = PIXI.Texture.fromFrame("stationlarge.png") : s.sprite.texture = PIXI.Texture.fromFrame("stationsmall.png");
      s.sprite.name = key;
      s.sprite.scale.x = map.scale.x;
      s.sprite.scale.y = map.scale.y;
      s.sprite.anchor = new PIXI.Point(0.5, 0.5);
      var sx = s.pos.x * (map.width/origMapSize.x);
      var sy = s.pos.y * (map.height/origMapSize.y);
      s.sprite.position = new PIXI.Point(sx, sy);
      //console.log('Adding listeners');
      s.sprite.interactive = true;
      s.sprite.buttonMode = true;
      s.sprite
        .on('mouseover', map.onStationMouseOver)
        .on('mouseout', map.onStationMouseOut);
      map.stationContainer.addChild(s.sprite);
    })
  };

  var lines = {
    orange: [
      {
        type: "station",
        name: "Vienna/Fairfax-GMU",
        pos: { x: [419], y: [1442]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Dunn Loring-Merrifield",
        pos: { x: [522], y: [1442]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "West Falls Church-VT/UVA",
        pos: { x: [624], y: [1442]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "East Falls Church",
        pos: { x: [759], y: [1442]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Ballston-MU",
        pos: { x: [859], y: [1442] },
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Virginia Square-GMU",
        pos: { x:[934], y: [1442] },
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Clarendon",
        pos: { x:[1011], y: [1442] },
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Court House",
        pos: { x:[1087], y: [1442] },
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Rosslyn",
        pos: { x:[1150], y: [1442,1355]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Foggy Bottom-GWU",
        pos: { x:[1150,1467], y: [1300,1205]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Farragut West",
        pos: { x:[1551], y: [1205]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "McPherson Square",
        pos: { x:[1702], y: [1205]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Metro Center",
        pos: { x:[1787], y: [1349]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Federal Triangle",
        pos: { x:[1787], y: [1458]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Smithsonian",
        pos: { x:[1787], y: [1540]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "L'Enfant Plaza",
        pos: { x:[2000], y: [1629]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Federal Center SW",
        pos: { x:[2126], y: [1629]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Capitol South",
        pos: { x:[2234], y: [1629]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Eastern Market",
        pos: {x:[2335], y: [1610]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Potomac Ave",
        pos: { x:[2392], y: [1552]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Stadium-Armory",
        pos: { x:[2511], y: [1526]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Minnesota Ave",
        pos: { x:[2707], y: [1449]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Deanwood",
        pos: { x:[2772], y: [1386]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Cheverly",
        pos: { x:[2835], y: [1321]},
        timeToNext: 1000
      },
      {
        type: "station",
        name: "Landover",
        pos: { x:[2899], y: [1257] },
        timeToNext: 1000
      },
      {
        type: "station",
        name: "New Carrollton",
        pos: { x:[2964], y: [1193]},
        timeToNext: 1000
      }
    ]
  };

  function createTween(train, line, position, direction) {
    var xarr = [];
    for(var i=0; i<lines[line][position+1].pos.x.length; i++) {
      xarr.push(lines[line][position+1].pos.x[i] * (map.width/origMapSize.x));
    }
    var yarr = [];
    for(var i=0; i<lines[line][position+1].pos.y.length; i++) {
      yarr.push(lines[line][position+1].pos.y[i] * (map.width/origMapSize.x));
    }
    new TWEEN.Tween(train)
      .to({
        x: xarr,
        y: yarr
      },lines[line][position].timeToNext)
      .onComplete(function() {
        if(lines[line][position+2]) {
          createTween(train, line, position+1)
        } else {
          console.log('Completed loop');
        }
      })
      .start();
  }

  map.addTrainSprites = function() {
    var train = new PIXI.Sprite();
    train.texture = PIXI.Texture.fromFrame("train.png");
    train.scale.x = map.scale.x;
    train.scale.y = map.scale.y;
    train.anchor = new PIXI.Point(0.5, 0.5);

    var sx = lines.orange[0].pos.x * (map.width/origMapSize.x);
    var sy = lines.orange[0].pos.y * (map.height/origMapSize.y);
    train.position = new PIXI.Point(sx, sy);

    //train.x = lines.orange[0].pos.x;
    //train.y = lines.orange[0].pos.y;

    //train.x = lines.orange[0].pos.x;
    //train.y = lines.orange[0].pos.y;

    console.log('Drawing train at ' + train.x+':'+train.y);

    createTween(train, "orange", 0);
    /*
     new TWEEN.Tween(train)
     .to({
     x: lines.orange[1].pos.x * (map.width/origMapSize.x),
     y: lines.orange[1].pos.y * (map.height/origMapSize.y)
     },lines.orange[0].timeToNext)
     .onComplete(function() {
     console.log('Completed loop');
     })
     .start();
     */
    map.trainContainer.addChild(train);
  };

  map.onLoaded = function() {
    console.log('Assets loaded');
    //map.renderer.render(map.stage);
    map.addStationSprites();
    map.addTrainSprites();
  };

  map.init = function() {
    PIXI.loader
      .add('../images/spriteatlas.json')
      .load(map.onLoaded);
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

    console.log('Manager');
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
var MANAGER = new MapManager();

(function refreshPredictions() {
  console.log('Updating...');
  _.each(MANAGER.stations, function(station) {
    station.trains = [];
  });
  m
    .request({
      method: "GET",
      url: "https://s3.amazonaws.com/cache.dcfahrt.com/dcrailprediction.json"
    })
    .then(railPredictions)
    .then(function(trains) {
      //console.log('Trains!');
      //console.log(MANAGER.stations);
      trains.Trains.forEach(function(train) {
        if(MANAGER.stations[train.LocationName]) {
          //console.log(train.LocationName+': '+train.Destination+':'+train.Min);
          MANAGER.stations[train.LocationName].trains.push(train);
        }
      });
    })
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
      m.component(DCMap, controller)
    ]
  }
};

m.route(document.body, "/", {
  "/": dcmetro
});
