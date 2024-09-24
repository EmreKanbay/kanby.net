# Source code of kanby.net

> Thanks to "Zayd al-Muqaddim al-Qamar al-‘Aarabi" for all his invaluable support

> Important, Ip is getting from x-forwarded-from header, so you must use a reverse proxy server like nginx to work

# TODO

```
[x] user ip needs to be included in JWT payload and checked if it is stolen
[] landing page is loading slow
[] for contentSecurityPolicy header, nonce may be added for scripts and styles

[] Create LOGS, and save them to database properly
[] Simplify everything with a simple library or framework
```

## SEO tips

- Avoid repeated or boilerplate text in <- title -> elements. It's important to have distinct text that describes the content of the page in the <- title -> element for each page on your site. Titling every page on a commerce site "Cheap products for sale", for example, makes it impossible for users to distinguish between two pages. Long text in the <- title -> element that varies by only a single piece of information ("boilerplate" titles) is also bad; for example, a common <- title -> element for all pages with text like "Band Name - See videos, lyrics, posters, albums, reviews and concerts" contains a lot of uninformative text

- Brand your titles concisely. The <- title -> element on your site's home page is a reasonable place to include some additional information about your site. For example:
  <- title ->ExampleSocialSite, a place for people to meet and mingle<- /title ->
  But displaying that text in the <- title -> element of every single page on your site will look repetitive if several pages from your site are returned for the same query. In this case, consider including just your site name at the beginning or end of each <- title -> element, separated from the rest of the text with a delimiter such as a hyphen, colon, or pipe, like this:
- Avoid including flight price information in <- title -> elements. Our systems will likely not show price information when generating title links for flight pages. This is because pricing for flights can change so fast (sometimes every few minutes), that what's shown in title links may not correspond to the actual price on the landing page.

- use meta open graph tags to be able to be appealing on social platforms

- Open Graph is important

- Structed data and rich search results

- Structed data and rich search results However, it is more important to supply fewer but complete and accurate recommended properties rather than trying to provide every possible recommended property with less complete, badly-formed, or inaccurate data.

- rich text results have so many sub branches, like for softwares, organisations, educational courses and way much more

For images as links, Google uses the alt attribute of the img element as anchor text, so be sure to add descriptive alt text to your images:

Good:

```html
<a href="/add-to-cart.html"
  ><img src="enchiladas-in-shopping-cart.jpg" alt="add enchiladas to your cart"
/></a>
```

Bad (empty alt text and empty link text):

```html
<a href="/add-to-cart.html"
  ><img src="enchiladas-in-shopping-cart.jpg" alt=""
/></a>
```

# Write good anchor text

Good anchor text is descriptive, reasonably concise, and relevant to the page that it's on and to the page it links to. It provides context for the link, and sets the expectation for your readers. The better your anchor text, the easier it is for people to navigate your site and for Google to understand what the page you're linking to is about.

**Bad (too generic):**
[**Click here**](https://example.com) to learn more.
[**Read more**](https://example.com).
Learn more about our cheese on our [**website**](https://example.com).
We have an [**article**](https://example.com) that provides more background on how the cheese is made.

**Tip**: Try reading only the anchor text (out of context) and check if it's specific enough to make sense by itself. If you don't know what the page could be about, you need more descriptive anchor text.

**Better (more descriptive):**
For a full list of cheese available for purchase, see the [**list of cheese types**](https://example.com).

**Bad (weirdly long):**
Starting next Tuesday, the [**Knitted Cow invites local residents of Wisconsin to their grand re-opening by also offering complimentary cow-shaped ice sculptures**](https://example.com) to the first 20 customers.

**Better (more concise):**
Starting next Tuesday, the [**Knitted Cow invites local residents of Wisconsin**](https://example.com) to their grand re-opening by also offering complimentary cow-shaped ice sculptures to the first 20 customers.

Write as naturally as possible, and resist the urge to cram every keyword that's related to the page that you're linking to (remember, keyword stuffing is a violation of our spam policies). Ask yourself, does the reader need these keywords to understand the next page? If it feels like you're forcing keywords into the anchor text, then it's probably too much.

Remember to give context to your links: the words before and after links matter, so pay attention to the sentence as a whole. Don't chain up links next to each other; it's harder for your readers to distinguish between links, and you lose surrounding text for each link.

**Bad (too many links next to each other):**
I've written about cheese [**so**](https://example.com/page1) [**many**](https://example.com/page2) [**times**](https://example.com/page3) [**this**](https://example.com/page4) [**year**](https://example.com/page5).

**Better (links are spaced out with context):**
I've written about cheese so many times this year: who can forget the [**controversy over blue cheese and gorgonzola**](https://example.com/blue-cheese-vs-gorgonzola), the [**world's oldest brie**](https://example.com/worlds-oldest-brie) piece that won the Cheesiest Research Medal, the epic retelling of [**The Lost Cheese**](https://example.com/the-lost-cheese), and my personal favorite, [**A Boy and His Cheese: a story of two unlikely friends**](https://example.com/boy-and-his-cheese).

- Internal links: cross-reference your own content

## What is this

- Source code of my personal website
- Has an admin panel and lets creating blogs and projects
- this is **not** a website builder

## How that works?

There are 3 levels

- Layout level,
- Page level,
- Component level

1. Pages are positioned in layouts.
2. components may be positioned in both.

for example there are 2 layouts i use today, admin layout and visitor layout. Those are the frontend interface which is same in common pages like contact, landing page, about us page may be contained by visitor layout and add project page, add blog page, modify blogs page, delete projects page may be contained by admin layout.

All pages, layouts, components are javascript files, which exports its content after rendering it.

and all pages, layouts, components has the ability to render in server side by just sending html css js to client.

we can fetch components from client side, it sends fully rendered html string from server to client.

All rendering happens in template strings, which has all the power that web frameworks and templating languages has.

Database is postgres SQL.

### SQL db setup codes

To be able to use this, you need to create these tables
and manually insert at least one user to be able to log in

```SQL

 CREATE TABLE users (id serial primary key, login_name text, creation_date text, password_hash text, profile_picture_url text, privilege text, public_name text)

```

```SQL
 CREATE TABLE variables (key text, value text[])

```

```SQL
 CREATE TABLE blogs (id serial primary key, title text, description text, language text, author text, creation_date text, last_modify_date text, thumbnail_url text, rendered_content text, raw_content text)
```

```SQL
 CREATE TABLE media (id serial primary key, full_url text, alt_text text)
```

### Template literal guides,

1. Tagged Template
2. Rendering Lists

#### Tagged Template

This is the code block which lets us to do all the things below, it simply extract the functions from template string, run them, and put the output back in string.

So it is possible to run async and sync functions in strings.

```js
const render = async (x, ...values) => {
  var rendered = "";
  for (let u = 0; u < x.length; u++) {
    rendered = rendered.concat(x[u]);
    if (u < x.length - 1) {
      if (typeof values[u] == "function") {
        rendered = rendered.concat(await values[u]());
      } else {
        rendered = rendered.concat(values[u]);
      }
    }
  }

  return rendered;
};
```

if you want to render a string just do this

```js
var renderedString = render`I am rendered`;
```

#### Rendering Lists

We can render a template html repetadly, for example fetch data from sql server and list all records.

```js
render`
<div id="blog-list">

${async () => {
  const text = `SELECT title,description,id FROM "blogs"`;
  const values = [];
  var record = await pool.query(text, values);
  return "".concat(
    ...(await Promise.all(
      record.rows.map((t) => {
        return `
				<h1>Title: ${t.title}</h1>
				<h1>description: ${t.description}</h1>
				`;
      }),
    )),
  );
}}

</div>

`;
```

You can run render function in a render function in a render function and so on.
Just do not forget to resolve promises

**Warning:** be careful using " ` ' inside of render, those may result errors in html side.

<code>&#96;document.querySelector(".class").innerHTML = &#92;&#96; &lt;div&gt;Complex HTML&lt;/div&gt; &#92;&#96; &#96;</code>

## Fetch component from server and render it on client

`/get-component/[admin | visitor]/[component_name]`

With the API above you can fetch components from server,
this API returns a json object with 2 elements inside
first is rendered html string,
second is rendered JS string.

both of these strings are rendered on server, the fetch method is post, so you can send data to server before render to add stuff inside to both js and html.

if you do not create a script tag and append it to DOM, script will not run. I mean innerHTML does not run scripts.

```js
document.querySelector(".V6bMFQ-loading").classList.add("active");
fetch("/get-component/admin/AdminBlogs", {
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ message: "User Not Found" }),
	method: "POST",
})
	.then(e => {e,e.json()})
	.then((e, json) => {

		document.querySelector(".V6bMFQ-loading").classList.remove("active");
		document.querySelector(".V6bMFQ-main-area-content").innerHTML = json.html;
		var eaa = document.createElement("script");
		eaa.innerText = json.js;
		document.querySelector(".A5ueMP-cotnainer").prepend(eaa);
	}).catch(e){alert("Fetch Error")};
```

Or you can create blob of js string and append script tag inside head tag with a src pointing to blob url

### Features

1. All development progress of this software will be available on this git repository.
2. Dockerfile will be available in every stable release.
3. **Error handling** and **cybersecurity** side will not be neglected.

```
- Blogs, news, Content and Static pages will be created on admin panel via markdown(.md)
- Users will have privileges
- SEO tools will be available from admin panel.
- Multi languages and their configuration is supported, all settings will be done from admin panel
- Frontend will recognise user and will render a different type of frontend for current user upon users privileges (eg. edit post button on spesific post)
- Everything must be responsive, specially admin panel. this wil let user modify & create content to website from anywhere
```

### Possible Features

```
- currently I was planning to make frontend design process by purely on code, but there may be pre-coded responsive frontend components which are customisable and user can sort them upon his/her own design. Like a few header component, a few footer component, Hero, Testimonials, Slider and etc. and all components will be compatible with each other.
- There may be a component creation page on admin panel like codepen where it lets user to code their own components.
- Auto sitemap creator
- robots.txt editor
- static page creation
- tutorial for markdown syntax
- custom component shortcodes for inserting html, css and js into markdown especially in Blogs, News, Contents
```

## Tech stack:

```markdown
1. FRONTEND

- Vanilla JS - For better speed and Better SEO

2. Backend

- Node JS,
- Express JS,

3. DATABASE

- Postgres SQL
```

<details>
<summary>Legacy</summary>

### Legacy

```js
String(
  (await Index.pool.query(`SELECT * FROM "variables"`)).rows[0].value.map(
    (t) => {
      return `
<option value="" selected disabled hidden>language</option>

	<option value="${t}">${t}</option>
`;
    },
  ),
).replaceAll(",", "\n");
```

![alt text](./ReadmeImages/image-3.png)

it is similar to React, we use string instead of JSX.

this code does not let us use comma(,) inside strings, and that is a problem.

use this ->

```js
console.log(
  "".concat(
    ...[1, 2, 3, 4, 6].map((t) => {
      return `tetetetet`;
    }),
  ),
);
```

BUT, if you will run async function inside of map, it will return you an array of promises, you need to resolve it with Promise.all(array of promises).

```js
<select required id="blog-form-language-edit">
  $
  {async () => {
    return await Promise.all(
      (await Index.pool.query(`SELECT * FROM "variables"`)).rows[0].value.map(
        async (r) => {
          return await render`

	<option ${() => {
    if (t.language == r) {
      return "selected";
    } else {
      return "";
    }
  }}  value="${() => r}">${() => r}</option>
`;
        },
      ),
    );
  }}
</select>
```

so final touch is this, you can use as much of async awaits and render tag as you want

```js

	${async () => {
		return "".concat(...(await Promise.all(
			[1,2,3,4].map(t => {

})
		)))
	}}

```

</details>
