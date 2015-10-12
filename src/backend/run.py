from app import app
import sys
import os

# ensure that output isn't buffered but output as soon as print is called
sys.stdout = os.fdopen(sys.stdout.fileno(), 'w', 0)

app.run(debug=True, host="0.0.0.0")