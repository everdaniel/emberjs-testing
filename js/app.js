App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Router.map(function() {
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
  this.resource('about');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  doneEditing: function() {
    this.set('isEditing', false);
  },

  edit: function() {
    this.set('isEditing', true);
  }
});

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  intro: DS.attr('string'),
  extended: DS.attr('string'),
  publishedAt: DS.attr('date')
});

App.Post.FIXTURES = [{
  id: 1,
  title: "Rails is Omakase",
  author: "d2h",
  publishedAt: new Date("2012-12-27"),
  intro: "There are lots of à la carte software environments in this world. Places where in order to eat, you must first carefully look over the menu of options to order exactly what you want. I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.",
  extended: "Rails is not that. Rails is omakase. A team of chefs picked out the ingredients, designed the APIs, and arranged the order of consumption on your behalf according to their idea of what would make for a tasty full-stack framework. The menu can be both personal and quirky. It isn't designed to appeal to the taste of everyone, everywhere."
}, {
  id: 2,
  title: "The Parley Letter",
  author: "d2h",
  publishedAt: new Date("2012-12-24"),
  intro: "My [appearance on the Ruby Rogues podcast](http://rubyrogues.com/056-rr-david-heinemeier-hansson/) recently came up for discussion again on the private Parley mailing list. A long list of topics were raised and I took a time to ramble at large about all of them at once. Apologies for not taking the time to be more succinct, but at least each topic has a header so you can skip stuff you don't care about.",
  extended: "It's simply not true to say that I don't care about maintainability. I still work on the oldest Rails app in the world. The original Basecamp code base is going to be ten years in a few months. It's still our biggest product and a multi-million dollar business. We still maintain it, fix things, and even occasionally introduce minor features. Until last year, when the new Basecamp premiered, we were introducing major features on a regular basis."
}];

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).fromNow();
});

var showdown = new Showdown.converter();
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
  return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});