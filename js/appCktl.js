/**************************
* Application
**************************/
App = Ember.Application.create({
  rootElement: '#content',
  ready: function() {
    console.log('App.onReady');
    var appController = this.get('router.applicationController');
    var navController = this.get('router.navigationController');
    appController.set('navigationController', navController);
  }
});

App.ApplicationController = Ember.Controller.extend();
App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

/**************************
* Controllers / Views
**************************/
//---- Navigation
App.NavigationController = Ember.Controller.extend({
  itemChanged: function() {
    // this is an inline version of .addObserver
    console.log("item changed");
  }.observes('selected')

});
App.NavigationView = Ember.View.extend({
  templateName: 'navigation',
  selectedBinding: 'controller.selected',
  navItemView: Ember.View.extend({
    tagName: 'li',
    classNameBindings: 'isActive:active'.w(),
    isActive: function() {
      console.log('isActive' + this.get('item') === this.get('parentView.selected'));
      return this.get('item') === this.get('parentView.selected');
    }.property('item', 'parentView.selected'),
    
    pvSelectedChanged: function() {
      // this is an inline version of .addObserver
      console.log("isActive changed");
    }.observes('parentView.selected')
    
  }),
  
  selectedChanged: function() {
    // this is an inline version of .addObserver
    console.log("selected changed");
  }.observes('selected')
  
});

//---- Home
App.HomeController = Ember.Controller.extend();
App.HomeView = Ember.View.extend({
  templateName: 'home',
  didInsertElement: function(){
    //this.$().hide().show('slow');
    //this.$().slideDown();
  }
});

//---- All Instructors
App.AllInstructorsController = Ember.ArrayController.extend();
App.AllInstructorsView = Ember.View.extend({
  templateName: 'allInstructors'
});

//---- All Disciplines
App.AllDisciplinesController = Ember.ArrayController.extend();
App.AllDisciplinesView = Ember.View.extend({
  templateName: 'allDisciplines'
});

/**************************
* Router
**************************/
App.Router = Ember.Router.extend({
  enableLogging: true,
  location: 'hash',
  
  root: Ember.Route.extend({
    //--- EVENTS
    gotoHome: Ember.Route.transitionTo('home'),
    gotoAllInstructors: Ember.Route.transitionTo('allInstructors'),
    gotoAllDisciplines: Ember.Route.transitionTo('allDisciplines'),

    //--- STATES  
	  home: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router) {
        router.set('navigationController.selected', 'home');
        router.get('applicationController').connectOutlet('home');
      }
	  }),
    
    allInstructors: Ember.Route.extend({
      route: '/instructors',
      connectOutlets: function(router){
        router.set('navigationController.selected', 'allInstructors');
        router.get('applicationController').connectOutlet('allInstructors',  [{login:'wycats'},{login:'tomdale'}]);
      }
    }),
      
    allDisciplines: Ember.Route.extend({
        route: '/disciplines',
        connectOutlets: function(router){
          router.set('navigationController.selected', 'allDisciplines');
          router.get('applicationController').connectOutlet('allDisciplines');
        }
    })
  })
});

/**************************
* Init
**************************/
App.initialize();