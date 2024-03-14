import type { CarouselInterface } from '../components/Carousel/interface'

class Instances {
  private _instances: {
    Carousel: { [id: string]: CarouselInterface }
  }

  constructor() {
    this._instances = {
      Carousel: {},
    }
  }

  addInstance(
    component: keyof Instances['_instances'],
    instance: any,
    id?: string,
    override = false,
  ) {
    if (!this._instances[component]) {
      console.warn(`Flowbite: Component ${component} does not exist.`)
      return false
    }

    if (this._instances[component][id!] && !override) {
      console.warn(`Flowbite: Instance with ID ${id} already exists.`)
      return
    }

    if (override && this._instances[component][id!]) {
      this._instances[component][id!].destroyAndRemoveInstance()
    }

    this._instances[component][id ? id : this._generateRandomId()] = instance
  }

  getAllInstances() {
    return this._instances
  }

  getInstances(component: keyof Instances['_instances']) {
    if (!this._instances[component]) {
      console.warn(`Flowbite: Component ${component} does not exist.`)
      return false
    }
    return this._instances[component]
  }

  getInstance(component: keyof Instances['_instances'], id: string) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return
    }

    if (!this._instances[component][id]) {
      console.warn(`Flowbite: Instance with ID ${id} does not exist.`)
      return
    }
    return this._instances[component][id] as any
  }

  destroyAndRemoveInstance(
    component: keyof Instances['_instances'],
    id: string,
  ) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return
    }
    this.destroyInstanceObject(component, id)
    this.removeInstance(component, id)
  }

  removeInstance(component: keyof Instances['_instances'], id: string) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return
    }
    delete this._instances[component][id]
  }

  destroyInstanceObject(component: keyof Instances['_instances'], id: string) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return
    }
    this._instances[component][id].destroy()
  }

  instanceExists(component: keyof Instances['_instances'], id: string) {
    if (!this._instances[component]) {
      return false
    }

    if (!this._instances[component][id]) {
      return false
    }

    return true
  }

  _generateRandomId() {
    return Math.random().toString(36).substr(2, 9)
  }

  private _componentAndInstanceCheck(
    component: keyof Instances['_instances'],
    id: string,
  ) {
    if (!this._instances[component]) {
      console.warn(`Flowbite: Component ${component} does not exist.`)
      return false
    }

    if (!this._instances[component][id]) {
      console.warn(`Flowbite: Instance with ID ${id} does not exist.`)
      return false
    }

    return true
  }
}

const instances = new Instances()

export default instances

// if (typeof window !== 'undefined') {
//   window.FlowbiteInstances = instances
// }
