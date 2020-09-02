from api import app ,db
import sys

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
    sys.stdout.flush()