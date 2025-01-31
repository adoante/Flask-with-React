### Preface
You know I guess you could just have python, pip, flask, flask-cors, node.js and npm/npx installed and just go from there.

<br>

The plan is to have a database and abstract the qai-hub api when uploading your own datasets and submitting compile/inference/etc. jobs which is why I used Anaconda.


Follow the [1] link for the most part but ignore sections 3.2 and 5.2 instead
look at the [2] link. Also use the [3] link for the SQLAlchemy stuff.

### *READ NOTES FIRST*.

1. Setting up Flask, SQLAlchemy and React
	- https://medium.com/@mlmason11/building-a-web-application-with-flask-sqlalchemy-and-react-a-comprehensive-guide-1b40ce803ca8 [1]
	- https://bobbyhadz.com/blog/react-fetch-data-on-button-click [2]
	- https://www.geeksforgeeks.org/connect-flask-to-a-database-with-flask-sqlalchemy/ [3]

2. Used miniconda to create Python environment
	- install
		- conda
			- https://anaconda.org/conda-forge/nodejs
		- pip
			- Flask
			- SQLAlchemy 
			- flask-cors
			- flask-migrate
			- sqlalchemy_serializer
	- Don't install
		- pip
			- flask-bcrypt
	- Useful conda environment docs
		- https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html

3. Notes
- Use `npx create-react-app client`  and you might need to use 
  `npm i web-vitals --save-dev` to resolve webpack compile errors
- Run app.py (flask app) using `flask run` or else you'll get a 404 error on all 
  the endpoints
- A conda `environment.yml` is provided use `conda env create -f environment.yml`
  to duplicate environment
- Only the `App.js` and `app.py` are provided b/c `App.js` does not call the 
  database and `app.js` does not implement SQLAlchemy at this time
- Just create your react app as shown above, copy and paste the provided `App.js`
  and run `app.py` as shown above then run React using `npm start` while in the
  `client` directory.
- MAKE SURE TO UPDATE React's `package.json` with  `"proxy": "http://localhost:5000/",`
  PLACE IT UNDER `"private: "`