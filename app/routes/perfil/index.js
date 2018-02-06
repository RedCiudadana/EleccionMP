import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
  breadCrumb: null,

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties(model);
    controller.setProperties({
      disqusShortname: config.disqus.shortname
    });
  }
});
