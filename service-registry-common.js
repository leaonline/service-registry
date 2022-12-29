import { SchemaOptions } from './lib/SchemaOptions'

/**
 * The base definition for the service registry,
 * the place where apps can register services and functions
 * that can be managed by the backend.
 * @type {object}
 */
export const ServiceRegistry = {}

/**
 * @inheritDoc {SchemaOptions}
 */
ServiceRegistry.schemaOptions = SchemaOptions

/**
 * @type {object}
 */
ServiceRegistry.methods = {}

/**
 * Returns registered data for a given language
 * @method
 */
ServiceRegistry.methods.get = {
  name: 'serviceRegistry.methods.get',
  schema: {
    lang: {
      type: String
    }
  },
  numRequests: 1,
  timeInterval: 1000,
  run: function ({ lang }) {
    return ServiceRegistry.get(lang)
  }
}
