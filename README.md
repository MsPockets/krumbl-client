# Krumbl Recipe Sharing

## **Description**
This single page web application is designed to allow users to upload recipes, view other's recipes, and make changes to the recipes they have added. It works very similarly to a social media website, in that a user can see every post that has been made, but are only able to modify their posts. 
## **Screenshots**
![](https://user-images.githubusercontent.com/57927064/78313480-d6b9e180-7524-11ea-94e1-54ec27551c81.png)


## **Links**
- [Front End Repository](https://github.com/MsPockets/krumbl-client)
- [Front End Deployed Site]()
- [Back End Repository](https://github.com/MsPockets/krumbl-api)
- [Back End Deployed Site](https://krumbl.herokuapp.com)
- [React Auth Template](https://git.generalassemb.ly/MsPockets/react-auth-template)
- [Rails API Template](https://git.generalassemb.ly/ga-wdi-boston/rails-api-template)

## **Set Up**

### **Dependencies**
#### **Front end**
- npm `npm install`
- Development Local Server `npm start`
- Grunt `npm install grunt`

#### **Back End**
- install gems `bundle install`
- API Local Server `bin/rails server`

### **Technologies Used**
For this web application I am using Ruby on Rails, React.js, HTML5, and CSS. 

## **User Stories**
**V1**
- As a user I want to be able to sign in.
- As a user I want to be able to sign up.
- As a signed in user I want to be able to change my password
- As a signed in user I want to be able to sign out
- As a signed in user I want to be able to create a recipe
- As a signed in user I want to be able to view recipes
- As a signed in user I want to be able to edit my recipes
- As a signed in user I want to be able to delete my recipes

**V2**
- As a signed in user I want to be able to like a recipe
- As a signed in user I want to be able to comment on a recipe
- As a signed in user I want to be able to upload a picture of my recipe


## **ERD**

![ERD](https://user-images.githubusercontent.com/57927064/78308951-cea77500-7517-11ea-80ce-03b7dee279cb.png)

## **Routes**
**User**
- Sign-up: 'POST'
- Sign-in: 'POST'
- Change Password: 'PATCH'
- Sign-out: 'DELETE'

**Recipe**
- Create Recipe: 'POST'
- Show Recipes: 'GET'
- Edit Recipe: 'PATCH'
- Delete Recipe: 'DELETE'

## **Planning/Devlopment**

**Day 1**
- On day 1 of the project I began by setting up my templates. After the templates were set up, I created GitHub respositories for each of them and linked them. I then set up the Heroku database and deployed my API to it. After finishing that I moved on to making the react routes in my client folder. This process continued into day 2

**Day 2**
- On day 2 of the project, I finished setting up the react routes. After that was finished, I began building the API by setting up the scaffolding and making minor adjustments. After building the scaffolding, I went back into the client folder and started working on getting everything working together. I ran into an issue today where I lost track of the state and had issues finding the id's of the recipes. This was because I forgot to add `match={match}` to my routes. This issue took the rest of the day

**Day 3**
- On day 3 it was back to fixing all of the recipe routes in my client folder. After those were finished, it was time to add UI improvements by adding routes to certain elements and addind redirects so the user has to click around less. This process continued until the end of the day when all that was left was, users being able to see all of the recipes but only modify their own, and autofilling form fields on update

**Day 4**
- On day 4 I was able to fix the autofilling update form fairly easily and quickly. It was a small matter of passing it `res.data.recipe` instead of just `recipe`. After that I began working on the users being able to access all recipes but only modify ones they own. After a while of trial and error, I created an issue and waited for another set of eyes. While I waited I continued to do UI improvements and began working on the documentation. After getting the issue resolved, my API completely broke and was throwing several errors I have never seen before. Figuring out what was wrong took the help of 3 instructors over the course of 3 hours. The problem was when I generated the scaffold, it generated 2 migrations that weren't supposed to be there. These migrations caused the password field in sign up to think that it was empty when password was being sent. After removing those migrations the issue was solved and I reached MVP. Unfortunately, the API issue took up the rest of the day, so I wasn't able to get any styling done on day 4, but styling will happen in future iterations of the app. 

## **Future Iterations**

In the future, I would like to implement comments for each of the recipes that way cooks can interact with each other and chat about the details of each recipe.

I also plan on adding likes in the form of favorites so that users will be able to save all their favorite recipes from other cooks and have them all in one place. 
