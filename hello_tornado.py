import tornado.escape
import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.gen
from tornado.options import define, options

import settings as Settings  # settings file for tornado
from datetime import date
import time
import multiprocessing
import serialworker
import json


define("port", default=8888, help="run on the given port", type=int)

clients = []


input_queue = multiprocessing.Queue()
output_queue = multiprocessing.Queue()


class MainHandler(tornado.web.RequestHandler):
	def get(self):
		self.write("Hello")


class HomeHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('bootstrap_main.html', data = None)


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('bootstrap_main.html')


class WebSocketHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		print 'new connection'
		clients.append(self)
		self.write_message("connected")

	def on_message(self, message):
		if message:
			print 'tornado received from client: %s' % json.dumps(message)
	        #self.write_message('ack')
	        input_queue.put(message)

	def on_close(self):
		print 'connection closed'
		clients.remove(self)


def main():

	## start the serial worker in background (as a deamon)
	sp = serialworker.SerialProcess(input_queue, output_queue)
	sp.daemon = True
	sp.start()

	tornado.options.parse_command_line()

	app = tornado.web.Application(
	    handlers=[
	        (r"/", IndexHandler),
	        (r"/ws", WebSocketHandler),
	        (r"/landing", HomeHandler),
	    ],
	    settings={
	    	"template_path": Settings.TEMPLATE_PATH,
			"static_path": Settings.STATIC_PATH,
			"debug": Settings.DEBUG
	    }
	)

	httpServer = tornado.httpserver.HTTPServer(app)
	httpServer.listen(options.port)
	print "Listening on port:", options.port
	#tornado.ioloop.IOLoop.instance().start()

	## check the queue for pending messages, and rely that to all connected clients
	def checkQueue():
	    if not output_queue.empty():
	        message = output_queue.get()
	        for c in clients:
	            c.write_message(message)

	mainLoop = tornado.ioloop.IOLoop.instance()
	scheduler_interval = 100
	scheduler = tornado.ioloop.PeriodicCallback(checkQueue, scheduler_interval, io_loop = mainLoop)
	scheduler.start()
	mainLoop.start()





if __name__ == "__main__":
	main()


# class Application(tornado.web.Application):
# 	def __init__(self):
# 		handlers = [
# 			(r"/", MainHandler),
# 			(r"/landing", HomeHandler),
# 			(r"/plot", HomeHandler),
# 			(r"/ws", WebSocketHandler),
# 		]
# 		settings = {
# 			"template_path": Settings.TEMPLATE_PATH,
# 			"static_path": Settings.STATIC_PATH,
# 			"debug": Settings.DEBUG
# 		}
# 		tornado.web.Application.__init__(self, handlers, **settings)


# if __name__ == "__main__":
# 	app = Application()
# 	httpServer = tornado.httpserver.HTTPServer(app) # new
# 	httpServer.listen(8888) # new
# 	tornado.ioloop.IOLoop.instance().start()