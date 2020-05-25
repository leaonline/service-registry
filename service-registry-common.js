import { SchemaOptions } from './lib/SchemaOptions'

export const ServiceRegistry = {}

ServiceRegistry.schemaOptions = SchemaOptions

ServiceRegistry.methods = {}
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
