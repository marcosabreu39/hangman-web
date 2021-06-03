
# Hangman-Web
## Front end of Hangman game application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.

## Steps to execute Hangman-Web application locally

Clone this repository and hanman-backend repository;

Use your prefered Angular IDE (I prefer vscode);

Run `npm install` to update its dependencies; 

Run `npm start` to deploy the application;

Follow the steps of Hangman-Backend `README.md`;

Access `http://localhost:4200/hangman`;

You can upload a .xml file with new word to play (already have 3), these words inside your file should follow the bellow pattern:

`<hangman>
			<word_list>
				<word>ears</word>
				<word>test</word>
				<word>apple</word>
				<word>coffee</word>
				<word>keycombo</word>
				<word>abcdefghijklmnopqrst</word>
			</word_list>
</hangman>
`
# Constraints of Hangman game application

Your words in xml file must be between 4 and 20 characters, including, otherwise will be removed;

If you put the same wrong letter, the game will consider another wrong letter;

## Hangman application's demo

```
Updating and watching updated files
```
<p align="center">
  <img width="1600" src="https://github.com/marcosabreu39/hangman-web/blob/master/src/assets/demo/HangmanWeb-upload-viewing-xml.gif">
</p>

```
 Game play's demo of Hangman application
```
<p align="center">
  <img width="2200" src="https://github.com/marcosabreu39/hangman_web_Angular_9_2021/blob/master/src/assets/demo/HangmanWeb-play-game.gif">
</p>

```
