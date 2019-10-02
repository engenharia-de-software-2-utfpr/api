'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const FirebaseService = require('./FirebaseService')

class FirebaseProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.bind('Adonis/Services/Firebase', (app) => {
      // Obtain application configuration in config/

      // Export our service
      return new FirebaseService({})
    })
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    //
  }
}

module.exports = FirebaseProvider
