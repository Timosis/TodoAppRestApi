# Todo Rest Api
Rest Api For Todo Application. Developed by using Node.js, Express.js and MongoDb. You can open project with Visual Studio Code.

## Node.js Server
This application developed by using node.js. Be sure that node.js has been installed your computer.If not, you can download it  https://nodejs.org/en/

## Mongo Database
If you want to use your own mongo database
before starting api application change mongo database connection url in `app.js` file according to yours. It should be like following statement

`var mongoDB = 'mongodb+srv://USERNAME:PASSWORD@todoapicluster-gdbis.mongodb.net/test?retryWrites=true&w=majority';`

If you don't have an account for mongo db you can get a one on https://www.mongodb.com.
Then create a cluster for database. Database will working on this cluster. The next step setting connection.
You will find a connect button to link for setting your connection string.

Choosing a string connection method useful for this application.
Copy connection string and change it in `app.js` file.

![Image of Mongo](https://github.com/Timosis/TodoAppRestApi/blob/master/MongoDbConnection.JPG)

Last step is that opening `terminal`. Type `npm start`. When the application starts if you connected database successfully
you'll see `MongoDB connection is successful. Connection is opened.
` message on `terminal`.

## Test Api
To ensure api methods works correctly type `npm test` on terminal. Test will works with fake data which declared primitively at the begining of file. Test result should be like following document

![Image of Test](https://github.com/Timosis/TodoAppRestApi/blob/master/TestResult.JPG)

