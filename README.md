# BachelorThesis
Bachelor Thesis - LMS and Smart Text-Editor to Enhance Teacher - Student Collaboration

## Ideas
  - Editing:
    - <a href="https://quilljs.com/guides/designing-the-delta-format/" target="_blank">Delta format on text</a> 
    - Tooltip -> user can select a few "commonly used tools" to attach to inline tooltip
  - Monitoring
    - Build delta format-monitoring system for user interaction with the document
    - Extend Quill Block-Blots to store info about that block of text or paragraph 
## Resources
  - <a href="https://github.com/quilljs/quill" target="_blank">Quill</a>
    - Integrate quill with VueJs - <a href="https://pineco.de/wrapping-quill-editor-in-a-vue-component/" target="_blank"> 
    Wrapping quill editor in a vue component</a> 
    - We will most propably need to start with quill-core, and extend that. Here is a nice
    <a href="https://stackoverflow.com/questions/51125342/implement-custom-editor-for-quill-blot" target="_blank">
    Stack Overflow</a> link

## Todoes:
  - Quill
    - Research:
      - [x] Understand - Quill-Parchment model
      - [x] Understand - delta format
      - [x] Study - Quill API
    - Practicals:
      - [ ] Build MediumClone using modules, and integrate with a Vue app
      
  - TinyMCE
    - Research:
      - [ ] Understand TinyMCE API
    - Practicals:
      - [ ] Try to download and extend TinyMCE core - MediumClone

  - Auth0:
    - Research:
      - [ ] Read relevant documentation
    - Practicals:
      - [ ] Implement role-based authentication system
