# api-file-metadata
FCC Apis and Microservices Projects - File Metadata Microservice

## Improvements
- Make AJAX request with `axios.js` and `FormData` API. Display response data on the same page.
- Dark-themed UI design
- Modularized api routes (routes/api.js)
- Set up error-handling middleware in server.js
- Display file size in human readable format with `filesize.js`
- Custom favicon

## Things I learned from this project

### server.js
1. Specify path before `express.static(path)`. This will create a virtual directory from which the clients can access public assets.
2. You can put your favicon inside 'public' folder. Otherwise link specified in index.js will not work. 
3. err.stack has some useful info. But sometimes undefined.
4. upload error = 406, "Not Acceptable"
5. `app.listen().address().port` has your port.

### routes/api.js
1. `multer.js` is an express middleware.
2. You set where to store the uploaded data: disk location or memory
3. multer will add file or files prop into `req.body' and pass it into next middleware.

### index.html
1. Add `enctype="multipart/form-data"` attribute to form elemenet when uploading file(s).
2. `jQery.slim` is light enough to include

### client.js
1. You can use jQuery. Especially for small projects.
2. For AJAXing file submit, use `FormData` and append input element's files[0] into it.
3. Then you can pass it as 2nd arg (next to req path) into axios.post
4. Also pass option as 3rd arg with header field (`headers: { 'Content-Type': 'multipart/form-data'}`
5. Chain `.then` and handle res.
6. Chain `.catch` and handle errors.
7. Use `filesize.js` for formating file size in bytes into human-readable format.
8. Also there is `sprintf.js` for string formatting. (or `d3.format`)
9. The data sent from the server in encapulated inside response object. Look for `data` field.

### style.css
1. There is a way to custom-css file input. Google it.
2. Maybe work on BS4 chops more to make it more likeable.

### .vscode
1. You can set `launch.js` to set the default node version. `"runtimeVersion": "10.16.3"`
