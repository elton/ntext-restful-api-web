# A web client built with Astro and UnoCSS

A web client built with `Astro` and `UnoCSS`, and the backend is a restful API server built using the `Ntext` framework.

## Technologies used

- [Astro](https://astro.build/)
- [UnoCSS](https://unocss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [SolidJS](https://solidjs.com/)
- [Nano Store](https://github.com/nanostores/nanostores)
- [JSON Web Token](https://jwt.io/)

## Summary

This project uses Astro to build a front-end site that can access data from an API built with a Rust Ntex web framework.

## Background

I'd like to build a web client that can access data from a restful API server. I chose Astro, SolidJS, and TypeScript because they are simple, modern, and fast. I use UnoCSS to style the components because it is a utility-first CSS framework that is easy to use and fast.

I use SolidJS and TypeScript to build components for Astro and also use UnoCSS to style the components. A few components use Astro native components, and I use Nano Store to manage the state of the application. Components can communicate with nano store each other to share data even between Astro component and SolidJS component.

To access the API server, I use the fetch API and JSON Web Token to authenticate the user. The user can log in and log out, and the user's data is stored in the local storage of the browser.

## Design

I will finish this part later.

## Definition of success

The project can access the API server and display the data on the front-end site. The user can log in and log out, and the user's access token is stored in the local storage of the browser, and the access token will be invalid when token has expired.

If there is not a valid access token, the user will be redirected to the login page.

If a user selects remember me check box on the login page, the access token will be stored in the local storage of the browser and will get a new valid access token when it's expired by using a refresh token.
