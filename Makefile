start:
	@echo "Starting server..."
	forever start -a -e err.log app/server.js

stop:
	@echo "Stopping server..."
	forever stop app/server.js

restart:
	@echo "Restart server..."
	forever restart app/server.js

dev:
	@echo "Starting devserver..."
	 supervisor -w app app/server.js