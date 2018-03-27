// sensor object with attributes and functions

var mongoose = require('mongoose');
var fs = require('fs');
var Schema = mongoose.Schema;

var imgSchema = new Schema({
  img: { 
    data: Buffer,
    contentType: String,
    path: String,
    set: function(imgPath) {

    }
  }
});

var Image = mongoose.model('Image', imgSchema);

// create a schema
var sensorSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // general name of sensor (e.g., grill temp, oyster hum, etc.)
  type: { type: String, required: true }, // e.g., temperature, humidity, piezo, etc.
  application: { type: String, default: "" }, // what the sensor is used for
  data: {
  	values: [{
      time: { type: Date, default: Date.now },
      value: { type: Number, default: -9999 }
    }],
  	units: { type: String, default: "" }, // units of measurement (e.g., degF)
  	triggers: [{
  		time: { type: Date, default: "" },
  		trigger: { type: String, default: "" } // any notable events (watering, stirring, etc.)
  	}],
  },
  meta: {
    description: , // more detail on use, etc.
    sensor_id: , // sensor's part number (e.g., LM335)
    datasheet: , // link to datasheet, or actual datasheet (depends on memory)
    circuit_diagram: 
  }
});

// add a custom method to sensorSchema:
// sensorSchema.methods.dudify = function() {
//   this.name = this.name + '-dude'; 
//   return this.name;
// };

// create model
var Sensor = mongoose.model('Sensor', sensorSchema);

// make this available to our users in our Node applications
module.exports = Sensor;