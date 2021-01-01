<h1 align="center">
  <br>
  <a href="https://github.com/codepunkt/gatsby-remark-opengraph"><img src="https://raw.githubusercontent.com/codepunkt/gatsby-remark-opengraph/master/docs/logo.png" alt="gatsby-remark-opengraph logo" width="250"></a>
  <br>
  gatsby-remark-opengraph 
  <br>
</h1>

<h4 align="center">Generate beautiful open graph images for Gatsby</h4>

<p align="center">
  <a href="https://badge.fury.io/js/gatsby-remark-opengraph">
    <img src="https://img.shields.io/npm/v/gatsby-remark-opengraph.svg?logo=npm&style=popout"/>
  </a>
  <a href="https://choosealicense.com/licenses/mit/">
    <img src="https://img.shields.io/npm/l/gatsby-remark-opengraph.svg?style=popout&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIzIDMgMjYgMjYiPgogIDxwYXRoIGZpbGw9IiMzZGE2MzkiIGQ9Ik0xNiA1LjU1OWMtNi4xMTggMC0xMS4wNzggNC45Ni0xMS4wNzggMTEuMDc5IDAgNC43NDkgMi45ODkgOC43OTkgNy4xODggMTAuMzc0bDIuNTUzLTYuODA4YTMuODA4IDMuODA4IDAgMSAxIDIuNjc0IDBsMi41NTMgNi44MDhjNC4xOTktMS41NzUgNy4xODgtNS42MjUgNy4xODgtMTAuMzc0IDAtNi4xMTktNC45Ni0xMS4wNzktMTEuMDc5LTExLjA3OXoiLz4KPC9zdmc+Cg==&colorB=lightgray" alt="License: MIT"/>
  </a>
   <a href="https://www.npmtrends.com/gatsby-remark-opengraph" title="Downloads"><img src="https://img.shields.io/npm/dm/gatsby-remark-opengraph.svg?style=popout"/></a>
</p>

<p align="center">
  <a href="#motivation">Motivation</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#how-to-use">How to use</a> •
  <a href="#options">Options</a> •
  <a href="#examples">Examples</a>
</p>

# Motivation

If your website is shared, you’ll want to present the contents of your page in an optimal way to encourage people to pay it a visit. Open graph makes links to your website "unfold" into an image, title, and description.

If you want to find out more about this, read my article:<br/><br/>
<a href="https://codepunkt.de/writing/generating-beautiful-open-graph-images-with-nodejs/"><img src="https://raw.githubusercontent.com/codepunkt/gatsby-remark-opengraph/master/docs/article.jpg" alt="codepunkt.de open graph image" width="600" /></a>

# Key Features

This plugin allows you to create beautiful open graph images for your Gatsby site at build time, tailor-made to your content.

- Choose a background image or color
- Layout any number of texts on top of that background
- Choose font, size, color and alignment for every text
- Choose custom image dimensions and restrict your text to bounding boxes

# Installation

Install `gatsby-remark-opengraph` as a development dependency to your current project

#### npm

```bash
npm install -D gatsby-remark-opengraph
```

#### yarn

```bash
yarn add -D gatsby-remark-opengraph
```

# How to use

The default usage of this package is as a gatsby remark plugin.

However, you can also use it as a Node.js package to generate open graph images for any other usecase, for example for your Gatsby homepage or in a FaaS setup for your server side rendered site.

## As a gatsby remark plugin

Use `gatsby-remark-opengraph` in the remark plugins array of your `gatsby-config.js`:

```js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-opengraph',
          options: {
            /**
             * OPTIONS, see below!
             */
          },
        },
      ],
    },
  },
],
```

## Options

| Name             | Type    | Description              |                                                                                                                                 |
| :--------------- | :------ | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **`background`** | string  | _Required_               | Either a 6 digit hex RGB color code or the absolute path to a background image.                                                 |
| **`texts`**      | Text[]  | _Required_               | An array of `Text` configuration objects. Can be empty. See table below!                                                        |
| **`filename`**   | string  | Default `'og-image.jpg'` | Filename the open graph image is saved as.                                                                                      |
| **`width`**      | number  | Default: `1200`          | Width of open graph image in pixels.<br /> Must be equal to the background image width, if a background image is used.          |
| **`height`**     | number  | Default: `630`           | Height of open graph image in pixels.<br /> Must be equal to the background image height, if a background image is used.        |
| **`outputPath`** | string  | Default: `''`            | Path the open graph image is saved to.<br/>Is prefixed by `./public` and suffixed by the `filename` option to form a full path. |
| **`log`**        | boolean | Default: `true`          | Toggles output logging.                                                                                                         |

### `Text` options

For each text that you want to write on top of your background, add an object to the array of texts.

For each entry, you must at least provide the `text` itself and a `font` file:

| Name                  | Type                        | Description           |                                                                                                                                                                                                                                                                  |
| :-------------------- | :-------------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| **`text`**            | string                      | _Required_            | Your text.                                                                                                                                                                                                                                                       |
| **`font`**            | string                      | _Required_            | Absolute path to a TrueType `.ttf` font.                                                                                                                                                                                                                         |     |
| **`fontSize`**        | number                      | Default `64`          | Font size of your text.                                                                                                                                                                                                                                          |
| **`color`**           | string                      | Default: `'#000000'`  | 6 digit hex RGB color code.                                                                                                                                                                                                                                      |
| **`x`**               | number                      | Default: `0`          | X position of your text in Pixels.                                                                                                                                                                                                                               |
| **`y`**               | number                      | Default: `0`          | Y position of your text in Pixels.                                                                                                                                                                                                                               |
| **`maxWidth`**        | number                      | Default: Image width  | Max width of your text. After reaching it, text will break to a new line.                                                                                                                                                                                        |
| **`maxHeight`**       | number                      | Default: Image height | Max height of your text. After reaching it, an error will be thrown!                                                                                                                                                                                             |
| **`horizontalAlign`** | 'left' / 'center' / 'right' | Default: `'left'`     | Horizontal alignment of your text.<br/><ul><li>`left`: text will grow to the right from it's `x` position</li><li>`center`: text will grow to left and right from it's `x` position</li><li>`right`: text will grow to the left from it's `x` position</li></ul> |
| **`verticalAlign`**   | 'top' / 'center' / 'right'  | Default: `'top'`      | Vertical alignment of your text.<br/><ul><li>`top`: text will grow to the bottom from it's `y` position</li><li>`center`: text will grow to top and bottom from it's `y` position</li><li>`bottom`: text will grow to the top from it's `y` position</li></ul>   |

## General usage

The plugin also exports a named function that accepts the same options as the remark plugin shown above, but function options are called with `null` instead of a markdownNode so it's a good idea to provide strings for `path` and `Text.text`.

If you're using Gatsby, you can use this in your `gatsby-node.js` to generate a generic open graph image for your site:

```js
const { createImage } = require('gatsby-remark-opengraph')

exports.createPages = async ({
  actions,
  graphql,
  reporter,
}) => {
  await createImage({
    // results in ./public/og-image.jpg if no filename is set
    path: '',
    /**
     * more OPTIONS, see above!
     */
  })
}
```

# Examples

Please provide me with examples of the open graph images that you generated! 😀

I will choose a few beautiful examples and then show them here with a link to your site.
