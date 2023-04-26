# prequesties

- first you need node js and npm to be installed in your device "you can check them by running `npm -v` && `node -v`"
- then you will need to have mysql in your machine " you can check that by running `mysql --version`"
  
## set up **done only once**

- open your terminal **and make sure that you are in the root diroctry** and type `npm i` then hit `Enter`
- after that type `npm install -g sequelize-cli`then hit `Enter`
- after that go to your `.env.sample` and rename it to `.env`
- in your `.env` file change your `DB_USER` to your mysql user name and your `DB_PASS` to your mysql password

## to run the program

- open your terminal **and make sure that you are in the root diroctry** and type `npm start` then hit `Enter`
- the app will be running on localhost on port `4000`
- then you can go to postman and see the requests
