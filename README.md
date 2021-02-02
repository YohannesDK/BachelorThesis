# BachelorThesis
Bachelor Thesis - LMS and Smart Text-Editor to Enhance Teacher - Student Collaboration

## Ideas
  - Login: 
    - Instead of having a basic form, use a slack like login method. Where you have different slides and sites. 
    - Have a guide on the start, that shows you how and where you can find different things on the app. 
  - Editing:
    - <a href="https://quilljs.com/guides/designing-the-delta-format/" target="_blank">Delta format on text</a> 
    - Tooltip -> user can select a few "commonly used tools" to attach to inline tooltip
  - Monitoring
    - Build delta format-monitoring system for user interaction with the document
    - Extend Quill Block-Blots to store info about that block of text or paragraph
    - Build a context module that takes in a blot, and binds it to a store state menegment object.
      - make sure that every blot besides embeds implements the context module. 
  - Delta is the key:
    - Extend delta so we can flag the different nodes, especially the "header" nodes.
    - Now that we have flagged each "header/topic" node, we can link the different paragraphs to each topic.
    - Difficult part: 
      - Flagging topics with several levels of subtopics...
        - Idea for solution:
          - Flag top-most header with some numerical value
          - Flag next sub-header with a numerical value with some relation to the presiding levels value.
          - Maybe use bits?  
  - Block blots:
    - Make it possible to store information about different Block Blots, by giving each block blot an id and store info about each block blot or "paragraph" dynamically.
      - Store info such as:
        - Question relation
        - Time used
        - Reference links
        
## Resources
  - <a href="https://github.com/quilljs/quill" target="_blank">Quill</a>
    - Integrate quill with VueJs - <a href="https://pineco.de/wrapping-quill-editor-in-a-vue-component/" target="_blank"> 
    Wrapping quill editor in a vue component</a> 
    - We will most propably need to start with quill-core, and extend that. Here is a nice
    <a href="https://stackoverflow.com/questions/51125342/implement-custom-editor-for-quill-blot" target="_blank">
    Stack Overflow</a> link
  - Best Practices
    - <a href="https://www.toptal.com/javascript/comprehensive-guide-javascript-design-patterns">The Comprehensive Guide to JavaScript Design Patterns</a>
    - <a href="https://labs.mlssoccer.com/a-javascript-project-structure-i-can-finally-live-with-52b778041b72">Nice project structure we could use?</a>
    - <a href="https://levelup.gitconnected.com/project-structure-and-building-routes-of-restful-api-with-node-js-f3a8b53d94e7">Node JS / Express RestAPI + typescript ❤️</a>
  - Quill Editor:
    - Shift + Enter, to expand block content, instead of creating a new block below
      - <a href="https://codepen.io/icosahebron/pen/mMEVog">Example 1</a>
      - <a href="https://codepen.io/mackermedia/pen/gmNwZP">Example 2</a>
      - <a href="https://codepen.io/icosahebron/pen/mMEVog">Github issue</a>

    - Image Handler so we can save the image location, instead of saving base64-encoded image
      - This could be a problem when saving very large images,
        - <a href="https://codepen.io/jackmu95/pen/EgBKZr"> Example 1</a>
        - <a href="https://github.com/quilljs/quill/issues/1089#issuecomment-319567957"> Example 2 (this is better)</a>
        - <a href="https://www.tutorialfor.com/blog-227128.htm"> Example 3 (or maybe this)</a>
        - <a href="https://github.com/quilljs/quill/issues/1089">Github issue</a>
        - Problem:
          - Uploading back again from server.
    
    
## Todoes:
  - Quill
    - Research:
      - [x] Understand - Quill-Parchment model
      - [x] Understand - delta format
      - [x] Study - Quill API
    - Practicals:
      - [x] Build MediumClone using modules, and integrate with a Vue app
      
  - Auth0:
    - Research:
      - [ ] Read relevant documentation
      - [ ] Nice link on how to <a href="https://blog.logrocket.com/the-perfect-architecture-flow-for-your-next-node-js-project/">structure</a>
            Node/JS App 
    - Practicals:
      - [ ] Implement role-based authentication system
