koa-react-universal-multi-page
==============

A boilerplate app to create universal, multi-page apps using Koa and React. See accompanying blog post [here](https://sandersdenardi.com/universal-multi-page-react/).

### Introduction

`koa-react-universal-multi-page` is not a fully-featured boilerplate, but simply a base build system that supports serving React views via defined routes. Features include:
* Multi-page app
* Serves universal React pages (server-side rendering)
* Fully ES6 syntax
* Async/await on the server
* Incremental development builds (only rebuild pages containing changed code)
* Production view builds (production env React builds, uglifying)

This project most notably **does not include**:
* Authentication system
* Styles (like SCSS or PostCSS)
* State management (like Flex or Redux)
* Static analysis (like Eslint or Flow)
* Hot reloading
* Tests

These add-ons, while essential for building a functional, production-ready application, are deliberately left out. All of the missing items can be implemented several different ways, so instead of including *my* preferred way of accomplishing those things, I chose to focus the project on the singular goal.

I have included my own ESLint rules, which you can feel free to ignore (unless you submit a PR).

### Packages

The major packages used are:
* koa v2
* react 16 (for improved server-side rendering)
* gulp 4
* webpack 3
* babel 6

### Usage

See [this blog post](https://sandersdenardi.com/universal-multi-page-react/) for a more in-depth discussion of how the project works.

To get started
* Add individual pages to the `src/views` directory (including any subdirectory) with filename ending in `Page.jsx` (such as `UserPage.jsx`)
* Specify which view to use in a particular route by adding `ctx.state.view = 'UserPage';` in the route handler (the filename without the `.jsx` extension)
* Run the app (Dev: `npm run watch`, Prod: `npm run gulp && NODE_ENV=production node index`)

### License

[MIT](https://github.com/sedenardi/koa-react-universal-multi-page/blob/master/LICENSE)

### Contributing

Issues and PRs are more than welcome, as long as they:
* Give clear explanation of the issue this is solving
* Maintain same code style as you see here
* Don't add any functionality explicitly listed in the "does not include" section
