import serial
import time

arduino = serial.Serial("COM5", 9600, timeout=.1)
data_file = open('temp_data_fridge.txt', 'a')

while True:
	# data = arduino.readline()[:-2]  # last bit gets rid of newline chars
	data = arduino.readline()
	the_time = time.strftime('%Y-%m-%dT%H:%M:%S')

	if data:
		
		result = the_time + ', ' + data + '\n'
		
		with open('temp_data_fridge.txt', 'a') as data_file:
			print result
			data_file.write(result) 