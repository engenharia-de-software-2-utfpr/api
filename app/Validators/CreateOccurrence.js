'use strict'

class StoreOccurrence {
  get rules() {
    return {
      "coordinates.latitude": "required|string",
      "coordinates.longitude": "required|string",
      "category_id": "required|string",
      "resources.photos": "required|array|min:1|max:3",
      "resources.photos.*": "url",
      "resources.video": "url",
      "resources.audio": "url",
      "description": "required|string|max:1000",
      "criticity_level": "required|number|range:0,6"
    }
  }
}

module.exports = StoreOccurrence
