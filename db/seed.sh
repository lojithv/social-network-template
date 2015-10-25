mongoimport --db blog --collection users --file ./db/users.json --jsonArray
mongoimport --db blog --collection posts --drop --file ./db/posts.json --jsonArray