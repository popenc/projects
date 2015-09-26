// brewing temperature sensor (water, hours, events) 1
// id: S01

var S01 = new {
	id: "S01",
	name: "brewing thermometer", // general name of sensor (e.g., grill temp, oyster hum, etc.)
	location: "kitchen", // where the sensor is (gps, kitchen, etc.)
	application: "water and mash temperature", // what the sensor is used for
	// data: {
	//   	values: [{
	//       time: { type: String, default: "00-00-00 00:00:00" },
	//       temp: { type: Number, default: -99.99 }
	//     }], // list of timestamp,value pairs for plotting
	//   	units: { type: String, default: "" }, // units of measurement (e.g., degF)
	//   	triggers: [{
	//   		time: { type: String, default: "" },
	//   		trigger: { type: String, default: "" } // any notable events with timestamp ('event' already taken)
	//   	}],
	//     meta: {
	//       description: { type: String, default: "" }
	//     }
	//   },
	//   meta: {
	//     description: { type: String, default: "" }, // more detail on use, etc.
	//     sensor_id: { type: String, default: "" }, // sensor's part number (e.g., LM335)
	//     datasheet: { type: String, default: "" }, // link to datasheet, or actual datasheet (depends on memory)
	//     circuit_diagram: { type: String, default: "" }, // image of circuit diagram
	//   }
	// });
}