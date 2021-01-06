import store from '@/store/store'

export function mapFields(options) {
  const object = {};
  for (let x = 0; x < options.fields.length; x++) {

    const field = [options.fields[x]];

    object[field] = {

      get() {
        return store.state[options.moduleKey] && store.getters[options.moduleKey + '/' + options.getter][field];
      },
      set(value) {
        if(!store.state[options.moduleKey])
          return;

        store.commit(options.moduleKey + '/' + options.mutation, {
          name: field,
          value
        });
      }
    };
  }
  return object;
}