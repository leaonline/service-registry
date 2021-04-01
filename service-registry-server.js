import { check, Match } from 'meteor/check'
import { EJSON } from 'meteor/ejson'
import { ServiceRegistry } from './service-registry-common'

const cache = new Map()
const langs = new Map()

const getSrc = () => {
  return {
    icon: cache.get('icon'),
    label: cache.get('label'),
    description: cache.get('description'),
    content: cache.get('content')
  }
}

function extract (source = {}, { schemaStr }) {
  const target = {}
  const entries = Object.entries(source)
  entries.forEach(([key, value]) => {
    target[key] = {}
    target[key].name = value.name

    const valueSchemaStr = JSON.stringify(value.schema, ServiceRegistry.replacer, 0)
    target[key].schema = valueSchemaStr === schemaStr ? null : value.schema
  })
  return target
}

function getDependencies (schema) {
  const dependencies = new Set()
  Object.values(schema).forEach(field => {
    if (!field.dependency) return

    const { collection, filesCollection, context } = field.dependency
    ;[collection, filesCollection, context].forEach(value => {
      if (value) dependencies.add(value)
    })
  })

  return Array.from(dependencies)
}

function clean (context) {
  const cleaned = {
    name: context.name,
    label: context.label,
    icon: context.icon,
    info: context.info,
    useHistory: context.useHistory,
    isFilesCollection: context.isFilesCollection,
    isConfigDoc: Boolean(context.isConfigDoc),
    isType: Boolean(context.isType),
    isItem: Boolean(context.isItem),
    representative: context.representative
  }

  if (context.schema) {
    cleaned.schema = context.schema
    cleaned.dependencies = getDependencies(context.schema)

    const schemaStr = JSON.stringify(context.schema, ServiceRegistry.replacer, 0)

    if (context.methods) {
      cleaned.methods = extract(context.methods, { schemaStr })
    }

    if (context.publications) {
      cleaned.publications = extract(context.publications, { schemaStr })
    }
  }

  if (context.isFilesCollection) {
    cleaned.accept = context.accept
    cleaned.extensions = context.extensions
    cleaned.maxSize = context.maxSize
    cleaned.original = context.original
    cleaned.preview = context.preview
  }

  if (context.types) {
    cleaned.types = context.types
  }

  return JSON.stringify(cleaned, ServiceRegistry.replacer, 0)
}

ServiceRegistry.init = function ({ icon, label, description }) {
  check(icon, String)
  check(label, String)
  check(description, Match.Maybe(String))
  cache.set('icon', icon)
  cache.set('label', label)
  cache.set('description', description)
  cache.set('content', [])
  cache.set('initialized', true)
}

ServiceRegistry.addLang = function (locale, config) {
  langs.set(locale, config)
}

ServiceRegistry.register = function (context) {
  if (!cache.get('initialized')) throw new Error('[ServiceRegistry] not initialized')
  const _content = cache.get('content')
  const cleaned = clean(context)
  _content.push(cleaned)
  cache.set('content', _content)
}

const getType = o => Object.prototype.toString.call(o)

ServiceRegistry.replacer = function replacer (name, val) {
  if (getType(val) === '[object RegExp]') {
    return EJSON.toJSONValue(val)
  } else if (typeof val === 'function') {
    return val.prototype && val.prototype.constructor && val.prototype.constructor.name
  } else {
    return val
  }
}

ServiceRegistry.get = function (lang) {
  if (!cache.get('initialized')) throw new Error('[ServiceRegistry] not initialized')
  const src = getSrc()
  src.lang = langs.get(lang)
  return src
}

export { ServiceRegistry }
