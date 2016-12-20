# Emails with Handlebars and Sass

A quick gulp script to compile `handlebars` → `html`, `sass` → `css` and then inline the css into the HTML.


## Usage

## Templates & Data

```    
_build/                         # output from gulp build processes
src/                    
  |-- scss/                     # sass/scss styles for your templates
  |-- templates/                # handlebars templates with .hbs extensions
      |-- partials/             # handlebars template partials, also with .hbs extensions
  |-- template-data/            # template data in json format.
.gitignore
gulpfile.js                     
package.json
readme.md                       
```

### Naming

The gulp processing will process all .hbs files in the templates directory.  During processing it will take template data from a file of the same name with a .json extension in the template-data directory.  For example:

Template: `./src/templates/sample.hbs`

Template-data: `./src/template-data/sample.json`

Scss files can have any name as they will be referenced in the template .hbs file, but in general try to maintain some naming association if the templates will have unique/custom styles.

## Compiling Templates

First run `npm install`

Then run `gulp` to compile.

Run `gulp clean` to remove the build directory.


