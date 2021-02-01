# Common Language
This document will try to identify the main elements of the Application. 
```
  - Editor - our document
    - Quill JS
      - Quill JS Document Model - Parchment
      - For describing the content and changes of a document - Delta
    - Monitoring
```
---

## Editor in detail
## <a href="https://github.com/quilljs/parchment">Parchment</a>
Parchment document model is made up of `Blots`, which mirror a DOM node. <br>
Blots can provide structure, formatting, and/or content. In addition Parchment provides so called <br>
`Attributors`, which are a counter part of the ordinary DOM Attribute. Like a DOM attribute's relationship to a node, Attributors are meant to belong to Blots. `This is what we are planning on using to id different parts of the document. By setting a data-id attribute`.

<h2>Blots</h2>

<a href="https://github.com/quilljs/parchment#block-blot"><h3>Block Blots</h3></a>
Basic implementation of a block scoped formattable parent Blot. Formatting a block blot by default will replace the appropriate subsection of the blot.

<br>

<a href="https://github.com/quilljs/parchment#inline-blot"><h3>Inline Blots</h3></a>
Basic implementation of an inline scoped formattable parent Blot. Formatting an inline blot by default either wraps itself with another blot or passes the call to the appropriate child.

<br>

<a href="https://github.com/quilljs/parchment#embed-blot"><h3>Embed Blots</h3></a>
Basic implementation of a non-text leaf blot, that is formattable. Its corresponding DOM node will often be a `Void Element`, but can be a `Normal Element`. In these cases Parchment will not manipulate or generally be aware of the element's children, and it will be important to correctly implement the blot's `index()` and `position()` functions to correctly work with cursors/selections.
Basically it is embedded elements such as images, videos...

---

## <a href="https://github.com/quilljs/delta">Delta</a>
Deltas are a simple, yet expressive format that can be used to describe contents and changes. The format is JSON based, and is human readable, yet easily parsible by machines. Deltas can describe any rich text document, includes all text and formatting information, without the ambiguity and complexity of HTML.
```js
  // Document with text "Gandalf the Grey"
// with "Gandalf" bolded, and "Grey" in grey
const delta = new Delta([
  { insert: 'Gandalf', attributes: { bold: true } },
  { insert: ' the ' },
  { insert: 'Grey', attributes: { color: '#ccc' } }
]);

// Change intended to be applied to above:
// Keep the first 12 characters, delete the next 4,
// and insert a white 'White'
const death = new Delta().retain(12)
                         .delete(4)
                         .insert('White', { color: '#fff' });
// {
//   ops: [
//     { retain: 12 },
//     { delete: 4 },
//     { insert: 'White', attributes: { color: '#fff' } }
//   ]
// }

// Applying the above:
const restored = delta.compose(death);
// {
//   ops: [
//     { insert: 'Gandalf', attributes: { bold: true } },
//     { insert: ' the ' },
//     { insert: 'White', attributes: { color: '#fff' } }
//   ]
// }
```

As you see deltas are made up of an Array of `Operations`, which describes changes to a document. 
The array can consist of three types of operations `Insert`, `Delete`, `Retain`. Deltas are also very suitable for `Operatinal Transformation`, which could be a use case in our Application if we manage to come so far. 

`A key factor we need to figure out is how to split a delta in smaller deltass, to have the page lazy load very large documents.?`

---

## How we want the document to look like.
```
(Topic 1/ 1st header)

   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
(1)| Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...

   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
(2)| Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...

(Topic 2 / 2nd header)

   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
(3)| Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
   | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
```

## Monitoring 
Looking at the desired document structure, our main idea was to use the `Topics / headers` <b>`start`</b> and <b>`endpoints`</b>, to specify the `scope` of a topic. Having grouped the topics and subtopics with their `child text blocks`, we can use that to monitor the time used on each of the topics. We'll create a `custom blot` for the topics/headers, and create a `reference` to that topic for each `child blot`, by adding it as a `data-attribute`. We managed to create a basic example on how we can use the `attributes`, section in a `delta`, shown below,

```js
import uuid from "uuid";
import Quill from "quill";

const inline = Quill.import('blots/inline')
// const Block = Quill.import('blots/block')
// const Delta = Quill.import('delta')
const Parchment = Quill.import("parchment");

const idAttributor = new Parchment.Attributor.Attribute('id', 'data-id', { 
  scope: Parchment.Scope.INLINE
});

class MyQuill extends Quill {}

class BoldBlot extends inline {
  static create(){
    const node = super.create();
    node.setAttribute('data-id', uuid.v4())
    return node
  }
}

BoldBlot.blotName = "bold";
BoldBlot.tagName = "strong";

MyQuill.register(BoldBlot, true);
MyQuill.register(idAttributor, true);

export default MyQuill;
```

Delta produced

```js
//Before

  const MyQuill = new MyQuill(root.value, {
        modules: {
          toolbar: toolbar2,
        },
        placeholder: "Write somehting cool...",
        theme: 'snow'
  });

  JSON.stringify(MyQuill.getContents());

  // "{"ops":
  //    [
  //      { "insert": "hei dette er en test, jeg skriver noe bare for å skrive noe hahahha.
  //          Men ja jeg skal gi første ordet en id.\nMen først skal jeg skrive litt til for fun, okey nok er nok.\n"
  //      }
  //    ]
  //  }"
```
```js
// After
  JSON.stringify(MyQuill.getContents());
  // The custom blot we made gives a id to the selected part, we bold event is triggered. this was the result after that event.

  // "{
  //  "ops":
  //    [
  //      {"attributes":{"id":"94ce381e-5787-4533-ad82-253b79af390e","bold":true},"insert":"hei"},
  //
  //      {"insert":" dette er en test, jeg skriver noe bare for å skrive noe hahahha.
  //        Men ja jeg skal gi første ordet en id.\nMen først skal jeg skrive litt til for fun,
  //        okey nok er nok.\n"
  //     }
  //    ]
  //  }"

```
---

Now that we have managed to identify the `different scopes` of a document. We need to create a `reactive module` that we'll attach to the delta changes and the different id's. This will be our `Context module`. Just as a document could have a `toolbar module`, we will have a `context module`.

### Main Responsibilities of the Context Module
  - `Monitor` time used on different parts of the document
  - Keep track of the `relationship` between a `topic` and its `context`. This includes keeping track of `questions`, `references` and `other resources` related to that topic. 

This will enable users , both teachers and students, to get some `feedback` from the application on which topics they are struggling with, and/or give them the `possibility` to `choose` the topic they want to `study`. It will also enable teachers to give homework assigments such as `Read and do questions about <topic name>`.

