import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.modelFor('application');
  },

  setupController(controller, model) {
    this._super(controller, model);

    Ember.run.scheduleOnce('afterRender', this, function() {
      // TODO: Pendiente de re-habilitar: esta sección habilita por primera vez la animación
      // de Isotope para organizar y filtrar funcionarios
      var $container = Ember.$('#portfolio');

      Ember.$(window).resize(function() {
        $container.isotope('layout');
      });

      if (model.config.banner1Accordion) {
        Ember.$('#slider').gridAccordion({
          width: Ember.$('#slider').width(),
          height: 250,
          captionHeight: 40,
          captionTop: 200,
          captionLeft: 100,
          columns: model.config.mainPageSliderData.length,
          distance: 2,
          openedPanelWidth: 500,
          alignType: 'centerCenter',
          linkTarget: '_self',
          slideshow: true
        });
      }
    });
  },

  actions: {

    // TODO: Pendiente de re-habilitar: esta función aplica un selector para el
    // filtro de funcionarios
    applyFilter(selector) {

      var $container = Ember.$('#portfolio');

      Ember.$('#portfolio-filter li').removeClass('activeFilter');

      Ember.$('#' + selector).addClass('activeFilter');

      var isotopeSelector = 'pf-todos' === selector ? '*' : '.' + selector;

      $container.isotope({transitionDuration: '0.65s'});

      $container.isotope({filter: isotopeSelector});

      return false;
    },

    // TODO: Pendiente de re-habilitar: esta función aplica un shuffle a los items
    // manejados por Isotope
    applyShuffle() {
      var $container = Ember.$('#portfolio');

      $container.isotope({transitionDuration: '0.65s'});

      $container.isotope('updateSortData').isotope({
        sortBy: 'random'
      });
    }
  }
});
