import serial

arduino = serial.Serial("COM4", 9600, timeout=.1)
while True:
	data = arduino.readline()[:-2]  # last bit gets rid of newline chars
	if data:
		print data
		# 