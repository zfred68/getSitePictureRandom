# getSitePictureRandom
get random picture from a google drive folder

create a new script in a Google site "App Script"
name it getSitePictureRandom
copy the code.gs and index.html to the new script
save it
Deploy as web app
copy the url generated

open or create a new page in your google site
edit the page
add a gadget by URL, using the saved url from above

store images to be randomly selected in your google drive,
the code uses the base folder /web-resources/images
from there sub-folders "locals","intl","afar" can be selected
see the code defining this...
<pre>
<code>
var imagelibbase = "/web-resources/images";
var imagelibs = ["locals","intl","afar"];
</code>
</pre>
....
so drop some images in these folders
If you give the images a description, that will appear as capture text under the image

