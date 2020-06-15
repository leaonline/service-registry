export const SchemaOptions = {
  unique: Boolean,
  dependency: {
    collection: String,
    field: String
  },
  list: Boolean,
  autoform: Object,
  value: {
    method: String,
    input: Array
  },
  options: Array,
  group: String
}