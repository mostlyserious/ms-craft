# RealFaviconGenerator Plugin

The `config.json` file found in this directory allows us to quickly and easily generate web icons for various platforms using [RealFaviconGenerator](https://realfavicongenerator.net). Using this method allows us to have some sensible defaults configured, inject the generated files into our project automatically, and cache bust any updates that may take place down the road.

Items in the configuration that often change project to project:
1. Occurrences of "masterPicture" to the appropriate icon file path relative to the `config.json` file
2. "design.windows.masterPicture" needs to be a single color version of the icon with transparency
3. Occurrences of "backgroundColor" and "themeColor" to reflect brand colors
4. "design.androidChrome.manifest.name" should be updated to reflect the site name
5. "design.ios.margin" can sometimes use some adjustment, but is often fine with default value

