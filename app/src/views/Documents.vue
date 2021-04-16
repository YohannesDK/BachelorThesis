<template>
  <div
    class="container d-flex justify-content-end p-1 align-items-center"
    style="margin-top:3%;"
  >
    <div class="navbar" style="margin: auto; margin-left:0;">
      <h1>My Documents</h1>
    </div>
    <div class="wrap">
      <input
        v-model="searchValue"
        id="document-search"
        name="search"
        type="text"
        placeholder="Looking for a document..."
      />
      <div class="search-icon-wrapper">
        <fa icon="search" size="lg" />
      </div>
    </div>
    <div class="search-icon-wrapper" style="min-height:45px; margin-left:1%;">
      <fa icon="filter" size="lg" />
    </div>
  </div>
  <div class="container" style="padding-left: 0.5%;">
    <div class="doc-container d-flex">
      <div class="doc-item add-item-container shadow-sm" @click="NewDocument()">
        <div class="add-item">
          <span>
            <p>New</p>
            <p>Document</p>
          </span>
          <div class="add-item-icon-container shadow">
            <fa icon="plus" />
          </div>
        </div>
      </div>
      <document-card
        v-for="(doc, index) in filteredDocuments"
        :document="doc"
        :key="index"
      />
      <h1 class="m-auto" v-if="filteredDocuments.length === 0">
        No documents found...
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount, Ref } from "vue";
import { useStore } from "vuex";
import { documentType } from "@/store/interfaces/document";
import DocumentCard from "@/components/documentCard.vue";
import axios from "axios";
import { UserType } from "@/store/interfaces/user.types";
import { CreateDocument } from "@/services/api/document.service";

export default defineComponent({
  name: "Documents",
  components: {
    DocumentCard
  },
  setup() {
    const store = useStore();
    const searchValue = ref<string>("");
    const documents = ref<Array<documentType>>(store.getters.getDocuments);

    const user: Ref<UserType> = ref<UserType>(store.getters.getActiveUser);

    // Create New Document
    const NewDocument = () => {
      if (user.value.UserID === -1) {
        return;
      }
      CreateDocument(user.value.UserID);
    };

    //for searching through document - name, tag, etc.
    const filteredDocuments = computed(() => {
      let tempDocuments = documents.value;

      if (searchValue.value !== "") {
        tempDocuments = tempDocuments.filter((doc: documentType) => {
          console.log(doc.name, doc.QuestionSetID);
          return (
            doc.name
              .replace(/ /g, "")
              .toUpperCase()
              .includes(searchValue.value.replace(/ /g, "").toUpperCase()) ||
            // Search text inside document
            // doc.delta
            //   .replace(/ /g, "")
            //   .toUpperCase()
            //   .includes(searchValue.value.replace(/ /g, "").toUpperCase()) ||
            doc.tags
              .map((tag: string) => {
                return tag.toUpperCase();
              })
              .includes(searchValue.value.toUpperCase())
          );
        });
      }
      return tempDocuments;
    });

    return {
      searchValue,
      filteredDocuments,
      NewDocument
    };
  }
});
</script>

<style scoped>
.navbar > h1 {
  color: grey;
  padding-top: 4%;
  margin: 0;
  font-size: 1.8rem;
  padding-left: 2%;
  white-space: nowrap;
}
.wrap {
  /* margin: 50px 100px; */
  display: inline-block;
  position: relative;
  height: 45px;
  float: right;
  padding: 0;
}

#document-search {
  height: 45px;
  font-size: 1.8rem;
  display: inline-block;
  font-family: "Lato";
  font-weight: 100;
  border: none;
  outline: none;
  color: #555;
  padding: 3px;
  padding-right: 60px;
  width: 0px;
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  z-index: 3;
  transition: width 0.4s cubic-bezier(0, 0.795, 0, 1);
  cursor: pointer;
}

#document-search:focus:hover {
  border-bottom: 1px solid #bbb;
}

#document-search:focus {
  width: 700px;
  z-index: 1;
  border-bottom: 1px solid #bbb;
  cursor: text;
}

.search-icon-wrapper {
  height: 100%;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: whitesmoke;
  color: grey;
  border-radius: 50%;
}

.doc-container {
  flex-wrap: wrap;
}

.add-item-container {
  border: 1px solid #dfe1e5;
  border-radius: 8px;
  box-shadow: none;
  cursor: pointer;
  opacity: 1;
  width: fit-content;
  height: 208px;
  margin-bottom: 20px;
  margin-right: 20px;
  transition: all 0.5s;
}

.add-item {
  -webkit-box-align: initial;
  align-items: initial;
  width: 176px;
  height: 208px;
  border: none;
  cursor: pointer;
  color: rgb(255, 255, 255);
  flex-direction: column;
  padding: 24px 16px;
  padding-top: 0;
  transition: all 0.2s ease 0s;
  border-radius: 8px;
  position: relative;
  background: #4b95b7;
  display: flex;
  justify-content: flex-start;
  transition: all 0.5s;
}

.add-item:hover {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
  background: #4b95b7f3;
}

/* .add-item:hover .add-item-icon-container {
  background: white;
  color: tomato;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
} */

.add-item span {
  display: block;
  font-size: 20px;
  line-height: 28px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 700;
  text-align: left;
  margin-top: 15%;
  /* text-align: center; */
}

.add-item span p {
  margin: 0;
}

.add-item-icon-container {
  min-width: 35px;
  min-height: 35px;
  margin: 13px auto 0px;
  text-align: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
  transition: all 0.5s;
}
</style>
