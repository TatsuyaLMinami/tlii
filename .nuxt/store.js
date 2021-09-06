import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('..\\store\\index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\data.js'), 'data.js')
  resolveStoreModules(require('..\\store\\chartItems\\defectData.js'), 'chartItems/defectData.js')
  resolveStoreModules(require('..\\store\\chartItems\\faultData.js'), 'chartItems/faultData.js')
  resolveStoreModules(require('..\\store\\chartItems\\gridDisasterData.js'), 'chartItems/gridDisasterData.js')
  resolveStoreModules(require('..\\store\\chartItems\\hiddenDangerData.js'), 'chartItems/hiddenDangerData.js')
  resolveStoreModules(require('..\\store\\chartItems\\lineData.js'), 'chartItems/lineData.js')
  resolveStoreModules(require('..\\store\\chartItems\\logData.js'), 'chartItems/logData.js')
  resolveStoreModules(require('..\\store\\chartItems\\patrolQueryData.js'), 'chartItems/patrolQueryData.js')
  resolveStoreModules(require('..\\store\\chartItems\\queryData.js'), 'chartItems/queryData.js')
  resolveStoreModules(require('..\\store\\chartItems\\resourceData.js'), 'chartItems/resourceData.js')
  resolveStoreModules(require('..\\store\\dictionaries\\dictionaries.js'), 'dictionaries/dictionaries.js')
  resolveStoreModules(require('..\\store\\mapItems\\defectData.js'), 'mapItems/defectData.js')
  resolveStoreModules(require('..\\store\\mapItems\\faultData.js'), 'mapItems/faultData.js')
  resolveStoreModules(require('..\\store\\mapItems\\hdData.js'), 'mapItems/hdData.js')
  resolveStoreModules(require('..\\store\\tableItems\\monitorData.js'), 'tableItems/monitorData.js')
  resolveStoreModules(require('..\\store\\tableItems\\tableItems.js'), 'tableItems/tableItems.js')
  resolveStoreModules(require('..\\store\\formItems\\deviceResource\\ip.js'), 'formItems/deviceResource/ip.js')
  resolveStoreModules(require('..\\store\\formItems\\deviceResource\\m.js'), 'formItems/deviceResource/m.js')
  resolveStoreModules(require('..\\store\\formItems\\deviceResource\\tc.js'), 'formItems/deviceResource/tc.js')
  resolveStoreModules(require('..\\store\\formItems\\system\\me.js'), 'formItems/system/me.js')
  resolveStoreModules(require('..\\store\\formItems\\system\\pe.js'), 'formItems/system/pe.js')
  resolveStoreModules(require('..\\store\\formItems\\system\\ro.js'), 'formItems/system/ro.js')
  resolveStoreModules(require('..\\store\\formItems\\system\\sk.js'), 'formItems/system/sk.js')
  resolveStoreModules(require('..\\store\\formItems\\panoramicMonitoring\\deviceOnlineMonitoring\\ac.js'), 'formItems/panoramicMonitoring/deviceOnlineMonitoring/ac.js')
  resolveStoreModules(require('..\\store\\formItems\\panoramicMonitoring\\deviceOnlineMonitoring\\al.js'), 'formItems/panoramicMonitoring/deviceOnlineMonitoring/al.js')
  resolveStoreModules(require('..\\store\\formItems\\panoramicMonitoring\\deviceOnlineMonitoring\\alR.js'), 'formItems/panoramicMonitoring/deviceOnlineMonitoring/alR.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\defect\\d.js'), 'formItems/transportationInspection/defect/d.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\defect\\h.js'), 'formItems/transportationInspection/defect/h.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\fault\\f.js'), 'formItems/transportationInspection/fault/f.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\fault\\h.js'), 'formItems/transportationInspection/fault/h.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\fixedConstructionSite\\f.js'), 'formItems/transportationInspection/fixedConstructionSite/f.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\hiddenDanger\\h.js'), 'formItems/transportationInspection/hiddenDanger/h.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\hiddenDanger\\hd.js'), 'formItems/transportationInspection/hiddenDanger/hd.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\monitor\\mt.js'), 'formItems/transportationInspection/monitor/mt.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\outagePlan\\o.js'), 'formItems/transportationInspection/outagePlan/o.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\patrol\\ic.js'), 'formItems/transportationInspection/patrol/ic.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\patrol\\it.js'), 'formItems/transportationInspection/patrol/it.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\patrol\\mm.js'), 'formItems/transportationInspection/patrol/mm.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\tools\\toolInventory\\ti.js'), 'formItems/transportationInspection/tools/toolInventory/ti.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\tools\\toolReceive\\tr.js'), 'formItems/transportationInspection/tools/toolReceive/tr.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\tools\\toolReturn\\tr.js'), 'formItems/transportationInspection/tools/toolReturn/tr.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\tools\\toolWarehouse\\tw.js'), 'formItems/transportationInspection/tools/toolWarehouse/tw.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\wireProtectionTeam\\wireProtectionTeam\\w.js'), 'formItems/transportationInspection/wireProtectionTeam/wireProtectionTeam/w.js')
  resolveStoreModules(require('..\\store\\formItems\\transportationInspection\\wireProtectionTeam\\wireProtectionTeamPerson\\wp.js'), 'formItems/transportationInspection/wireProtectionTeam/wireProtectionTeamPerson/wp.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '..\\store\\data.js',
      '..\\store\\index.js',
      '..\\store\\chartItems\\defectData.js',
      '..\\store\\chartItems\\faultData.js',
      '..\\store\\chartItems\\gridDisasterData.js',
      '..\\store\\chartItems\\hiddenDangerData.js',
      '..\\store\\chartItems\\lineData.js',
      '..\\store\\chartItems\\logData.js',
      '..\\store\\chartItems\\patrolQueryData.js',
      '..\\store\\chartItems\\queryData.js',
      '..\\store\\chartItems\\resourceData.js',
      '..\\store\\dictionaries\\dictionaries.js',
      '..\\store\\mapItems\\defectData.js',
      '..\\store\\mapItems\\faultData.js',
      '..\\store\\mapItems\\hdData.js',
      '..\\store\\tableItems\\monitorData.js',
      '..\\store\\tableItems\\tableItems.js',
      '..\\store\\formItems\\deviceResource\\ip.js',
      '..\\store\\formItems\\deviceResource\\m.js',
      '..\\store\\formItems\\deviceResource\\tc.js',
      '..\\store\\formItems\\system\\me.js',
      '..\\store\\formItems\\system\\pe.js',
      '..\\store\\formItems\\system\\ro.js',
      '..\\store\\formItems\\system\\sk.js',
      '..\\store\\formItems\\panoramicMonitoring\\deviceOnlineMonitoring\\ac.js',
      '..\\store\\formItems\\panoramicMonitoring\\deviceOnlineMonitoring\\al.js',
      '..\\store\\formItems\\panoramicMonitoring\\deviceOnlineMonitoring\\alR.js',
      '..\\store\\formItems\\transportationInspection\\defect\\d.js',
      '..\\store\\formItems\\transportationInspection\\defect\\h.js',
      '..\\store\\formItems\\transportationInspection\\fault\\f.js',
      '..\\store\\formItems\\transportationInspection\\fault\\h.js',
      '..\\store\\formItems\\transportationInspection\\fixedConstructionSite\\f.js',
      '..\\store\\formItems\\transportationInspection\\hiddenDanger\\h.js',
      '..\\store\\formItems\\transportationInspection\\hiddenDanger\\hd.js',
      '..\\store\\formItems\\transportationInspection\\monitor\\mt.js',
      '..\\store\\formItems\\transportationInspection\\outagePlan\\o.js',
      '..\\store\\formItems\\transportationInspection\\patrol\\ic.js',
      '..\\store\\formItems\\transportationInspection\\patrol\\it.js',
      '..\\store\\formItems\\transportationInspection\\patrol\\mm.js',
      '..\\store\\formItems\\transportationInspection\\tools\\toolInventory\\ti.js',
      '..\\store\\formItems\\transportationInspection\\tools\\toolReceive\\tr.js',
      '..\\store\\formItems\\transportationInspection\\tools\\toolReturn\\tr.js',
      '..\\store\\formItems\\transportationInspection\\tools\\toolWarehouse\\tw.js',
      '..\\store\\formItems\\transportationInspection\\wireProtectionTeam\\wireProtectionTeam\\w.js',
      '..\\store\\formItems\\transportationInspection\\wireProtectionTeam\\wireProtectionTeamPerson\\wp.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
