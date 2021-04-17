# Editor - Monitoring
Research and ideas on how we should go about monitoring editor interactions

## Main Objectives
  - Define Topic Scopes
    - Give each **header**, an id, UUID, so we can reference it in other relationships

      - This need to be **Reactive**, i.e. while someone is editing a document, if
        they delete or modify a header, it should be modified on our monitoring module 
          - Take a look at reactivity used in vue (JS proxies and the ref function )

    - Need to structure this in a way that shows the relationship between parent headers and child headers
      - Data structures to consider
        - Linked list
        - Tree structure
    ``` 

                (root - document)
               /                  \
          (topic 1)               (topic 2) (parent here is root)
          /                      /         \
    (sub topic 1)         (subtopic 3)     (subtopic 4) (parent here is topic 2, topic scope of topic 2 end where its leaf node is)
    ```

  - Attach question sets to topics
    - This will be easy once we have managed to define topic scopes. We just assign a question set to that header

  - Monitor time used on each topic 
    - This will be a little bit harder, but once we have defined topic scopes,
      we will use those ids to keep track of where it exists on the page,
      and depending on where it is, we will add some time to its


### Links
  - Quill Customization
    - <a href=""> Awesome Quill</a>
    - <a href="https://www.javaer101.com/en/article/19669004.html" target="_blank"> Implement Custom editor for Quill Blot </a>
    - <a href="https://github.com/reedsy/quill-cursors" target="_blank">quill-cursor module example</a>
    - <a href="https://codepen.io/scottfr/pen/LKLLpJ" target="_blank">Greate Example on how to create a module</a>
    - <a href="https://stackoverflow.com/questions/43978105/how-do-you-retain-the-custom-attributes-for-a-paragraph-in-quilljs" target="_blank">
        This one as well</a>


  - Reactivity
    - 

### Ideas
  - Quill Customization
    - Need to combine quill events with blot customization
      > f.eks. if cursor is at a header blot show button for adding question sets 
  - Reactivity 
    - Quill has some events for when the text changes, we need to create \\
      a module that does what we want and attach that module to quills **text-change** event.
      > If the blot or header we are deleting has question sets or other resources linked to it, notify the user


### Choices
  - ... 


