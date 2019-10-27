'use strict'

class StoreOccurrence {
  get rules() {
    return {
      "coordinates.latitude": "required|string",
      "coordinates.longitude": "required|string",
      "category_id": "required|string",
      "num_photos": "required|number|range:0,4",
      "num_videos": "required|number|range:-1,2",
      "num_audios": "required|number|range:-1,2",
      "description": "string|max:1000",
      "criticity_level": "required|number|range:0,6"
    }
  }
}

module.exports = StoreOccurrence
