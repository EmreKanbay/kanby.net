const { marked } = require("marked");

//     const Components = require("#Components")
//     ${Components.Markdown(markedown="# dasasd \n 1. **test** \n - here it goes \n ![img](https://i.ytimg.com/vi/THvIFgaz3JM/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBzgWAAsAHigIMCAAQARhlIGUoZTAP&rs=AOn4CLDFeIpaG8aJKimWtnJBGJb2YhexoA)")}

module.exports = markdown => marked.parse(markdown);
