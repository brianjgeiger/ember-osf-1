import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  store: Ember.inject.service(),
  didRender: function() {
      this.get('licensesAvailable');
  },
  // nodeLicense: Ember.computed('licensesAvailable', function() {
  //     return this.get('currentValues.licenseType') || this.get('licensesAvailable')[0];
  //     //return this.get('store').findRecord('license', '57a8c6b752386caf6a68df1e');//this.get('licenseId'));
  // }),
  licensesAvailable: Ember.computed('currentValues', 'attrs.licenses', function() {
      //if (!this.get('attrs.licenses.value') || this.get('attrs.licenses').length === 0) {
          return this.get('store').query('license', {'page[size]': 20}).then(ret => {
              ret.forEach(each => {
                  console.log(each.get('name'));
                  if (each.get('name') === "No license") {

                      this.set('nodeLicense', each);
                  }
              })
            //   this.set('nodeLicense', ret[0]);
              return ret;
          });
      //}
      //return this.get('licenses');
  }),
  year: null,
  copyrightHolders: null,
  actions: {
      selectLicense() {
          console.log('ok')
      },
      save() {
          let values = {
              licenseType: this.get('nodeLicense'),
              year: this.get('year'),
              copyrightHolders: this.get('copyrightHolders')
          };
          this.attrs.editLicense(values);
      },
      dismiss() {
          this.attrs.dismiss();
      }
  }
});
