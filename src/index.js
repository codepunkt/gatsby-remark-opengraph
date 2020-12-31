const { readFileSync } = require('fs')
const { join } = require('path')
const chalk = require('chalk')
const Jimp = require('jimp')
const {
  render,
  Text,
  RgbColor,
  Position,
  Dimension,
  Alignment,
  VerticalAlign,
  HorizontalAlign,
} = require('@codepunkt/wasm-layout-text')

const pluginName = 'gatsby-remark-opengraph'

const hexToRgb = (hex) => {
  const hexCode = hex.replace(/^#/, '')
  const bigint = parseInt(hexCode, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

module.exports = async (
  { markdownNode },
  {
    background,
    width = 1200,
    height = 630,
    filename = 'og-image.jpg',
    outputPath = '',
    texts = [],
    log = true,
  }
) => {
  const path = join(
    './public',
    typeof outputPath === 'function' ? outputPath(markdownNode) : outputPath,
    filename
  )

  const backgroundLayer = background.match(/[0-9A-Fa-f]{6}/g)
    ? await new Jimp(width, height, background)
    : await Jimp.read(background)

  if (
    backgroundLayer.bitmap.height !== height ||
    backgroundLayer.bitmap.width !== width
  ) {
    throw new Error(
      `${pluginName}: background image is not ${width} x ${height}!`
    )
  }

  return Promise.all([
    backgroundLayer,
    ...texts.map(
      ({
        text,
        font,
        fontSize = 64,
        color = '#000000',
        x = 0,
        y = 0,
        maxWidth = width,
        maxHeight = height,
        horizontalAlign = 'left',
        verticalAlign = 'top',
      }) => {
        let hAlign, vAlign
        switch (horizontalAlign) {
          case 'left':
            hAlign = HorizontalAlign.Left
            break
          case 'center':
            hAlign = HorizontalAlign.Center
            break
          case 'right':
            hAlign = HorizontalAlign.Right
            break
          default:
            throw new Error(`${pluginName}: Unknown horizontalAlign!`)
        }
        switch (verticalAlign) {
          case 'top':
            vAlign = VerticalAlign.Top
            break
          case 'center':
            vAlign = VerticalAlign.Center
            break
          case 'bottom':
            vAlign = VerticalAlign.Bottom
            break
          default:
            throw new Error(`${pluginName}: Unknown verticalAlign!`)
        }
        const buffer = render(
          new Text(
            typeof text === 'function' ? text(markdownNode) : text,
            fontSize,
            new RgbColor(...hexToRgb(color)),
            readFileSync(font)
          ),
          new Dimension(width, height),
          new Dimension(maxWidth, maxHeight),
          new Position(x, y),
          new Alignment(hAlign, vAlign)
        )
        return new Jimp({ data: buffer, width, height })
      }
    ),
  ])
    .then(([backgroundLayer, ...textLayers]) => {
      let result = backgroundLayer
      textLayers.forEach((textLayer) => {
        result = result.composite(textLayer, 0, 0)
      })
      return result.quality(100)
    })
    .then((image) =>
      image
        .writeAsync(path)
        .then(() => {
          if (log) {
            console.log(
              `${chalk.green('success')} ${chalk.cyan(
                'gatsby-remark-opengraph'
              )} ${path}`
            )
          }
        })
        .catch((err) => err)
    )
    .catch(console.error)
}

module.exports.createImage = async (options) => {
  return await module.exports({ markdownNode: null }, options)
}
