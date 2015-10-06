console.log('\'Allo \'Allo!');

var Fahrt = {};

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
    return {};
  },
  view: function(controller) {
    return m(".container", [
      m(".row", [
        m(".col-lg-12", [
          m("h1", "DC Map"),
          m("img[src='../images/testmap1150.png']")
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

