<template>
  <div class="addcoursemodule-container">
    <div class="row">
      <h2 class="title">{{ Title }}</h2>
    </div>
    <div class="row">
      <div class="addcoursemodule-module-data">
        <div class="module-name-container">
          <div class="modulename">
            <div class="wordside" style="position: relative;">
              <div class="question-input-container">
                <div class="module-input-inner">
                  <input
                    class="module-input"
                    placeholder="Enter Module Name"
                    v-model="courseModuleData.moduleName"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="module-sections-container">
          <div class="desc-container">
            <h5>Sections</h5>
            <div class="icon-container" @click="AddNewSection()">
              <span>+</span>
            </div>
          </div>
          <div class="module-sections-header">
            <ul class="list-unstyled">
              <li
                v-for="(section, index) in courseModuleData.moduleSections"
                :key="section"
                :class="{ 'active shadow': sectionIndex === index }"
                @click="SectionChange(index)"
              >
                <input
                  type="text"
                  v-model="section.SectionName"
                  placeholder="Section Name..."
                  @input="UpdatedSection(section)"
                  :disabled="sectionIndex !== index"
                />
                <span @click="DeleteSection(index)">x</span>
              </li>
            </ul>
          </div>
          <div class="module-section-items-container">
            <div class="module-section-items-header">
              <div class="desc-container">
                <h5>Section Items</h5>
                <div class="icon-container" @click="NewSectionItem()">
                  <span>+</span>
                </div>
              </div>
            </div>
            <div class="module-section-items">
              <ul
                class="list-unstyled"
                v-if="courseModuleData.moduleSections[sectionIndex]"
              >
                <li
                  v-for="(sectionitem, index) in courseModuleData
                    .moduleSections[sectionIndex].SectionItems"
                  :key="sectionitem"
                  :class="{ 'active shadow': sectionItemIndex === index }"
                  @click="SectionItemChange(index)"
                >
                  <input
                    type="text"
                    v-model="sectionitem.Item"
                    @input="UpdatedSectionItem(sectionitem)"
                    placeholder="Section Name..."
                    :disabled="sectionItemIndex !== index"
                  />
                  <span @click="DeleteSectionItem(sectionIndex, index)">x</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        class="addcoursemodule-module-attachments"
        :class="{ disabled: !DisableAttachArea }"
      >
        <div class="searchbar-container">
          <input
            type="text"
            class="searchbar shadow"
            placeholder="Search..."
            v-model="searchvalue"
          />
          <div
            class="search-type-dropdown-container"
            :class="{ shadow: !showDropDown }"
            @mouseleave="showDropDown = false"
            @click="showDropDown = true"
          >
            <span> {{ AddOptionLabel }} </span>
            <div class="search-dropdown-icon-container">
              <fa icon="caret-down" />
              <ul class="list-unstyled" v-if="showDropDown">
                <li @click="updateItemType(0)">Document</li>
                <li @click="updateItemType(1)">Question Set</li>
                <li @click="updateItemType(2)">Link</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="search-result-container" v-if="DisableAttachArea">
          <div class="search-result-inner">
            <ul class="list-unstyled" v-if="addOption === 0">
              <li
                v-for="doc in searcheddocuments"
                :key="doc"
                :class="{ active: SectionItemDocID === doc.Documentid }"
                @click="updateItemResourceIdSelection(doc.Documentid)"
              >
                <span>{{ doc.name }}</span>
              </li>
            </ul>
            <ul class="list-unstyled" v-if="addOption === 1">
              <li
                v-for="qs in searchedquestionsets"
                :key="qs"
                :class="{ active: SectionItemQSID === qs.QSID }"
                @click="updateItemResourceIdSelection(qs.QSID)"
              >
                <span>{{ qs.Tittle }}</span>
              </li>
            </ul>

            <div class="search-result-link-container" v-if="addOption === 2">
              <input
                type="text"
                class="search-result-link-input shadow"
                placeholder="Enter Link..."
                v-model="itemlink"
                @change="updateItemLink()"
              />
            </div>
          </div>
          <div class="search-result-actions">
            <div class="search-result-action-btn shadow" @click="Save()">
              <span v-if="Saved === false">Save</span>
              <span v-if="Saved === true">Saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch } from "vue";
import {
  CourseModule,
  CourseModuleSection,
  CourseModuleSectionItems,
  CourseModuleItemEnum
} from "@/store/interfaces/course";
import store from "@/store";
import { documentType } from "@/store/interfaces/document";
import { QuestionSet } from "@/store/interfaces/question.type";
import router from "@/router";
import {
  CreateCourseModule,
  UpdateCourseModule
} from "@/services/api/course.service";
export default defineComponent({
  name: "AddCourseModule",
  props: {
    courseID: {
      type: Number,
      default: -1
    },
    CourseModuleAction: {
      type: Number,
      default: 0
    },
    courseModule: {
      type: Object as () => CourseModule,
      default: () => ({})
    }
  },
  setup(props) {
    // TODO - validering av input
    const Title = computed(() => {
      if (props.CourseModuleAction === 0) {
        return "Add New Course Module";
      }
      if (props.CourseModuleAction === 1) {
        return "Edit Course Module";
      }
    });
    const ModuleName = ref<string>("");
    const showDropDown = ref(false);
    const sectionIndex = ref(-1);
    const sectionItemIndex = ref(-1);
    const addOption = ref(-1);
    const searchvalue = ref("");
    const itemlink = ref("");
    const Added = ref(false);
    const Saved = ref(false);

    const SelectedDocID = ref(-1);
    const SelectedQSID = ref(-1);

    const documents: Ref<documentType[]> = ref(store.getters.getDocuments);
    const questionsets: Ref<QuestionSet[]> = ref(
      store.getters.getAllQuestionSets
    );

    const courseModuleData: Ref<CourseModule> = ref({
      courseModuleID: -1,
      courseId: -1,
      moduleOrderIndex: 0,
      public: false,
      moduleName: "",
      moduleSections: []
    });

    // to capture updates when editing module
    const updatedModuleName = ref(courseModuleData.value.moduleName);
    const updatedModuleSections: any = {};
    const updatedModuleSectionItems: any = {};
    const deletedModuleSections: any = {};
    const deletedModuleSectionItems: any = {};

    const UpdatedSection = (section: CourseModuleSection) => {
      if (section.SectionID !== -1) {
        if (!(section.SectionID in updatedModuleSections)) {
          updatedModuleSections[section.SectionID] = section 
          return;
        } 
        updatedModuleSections[section.SectionID] = section 
      }
    }

    const UpdatedSectionItem = (sectionItem: CourseModuleSectionItems) => {
      if (sectionItem.ItemID !== -1) {
        if (!(sectionItem.ItemID in updatedModuleSectionItems)) {
          updatedModuleSectionItems[sectionItem.ItemID] = sectionItem 
          return;
        } 
        updatedModuleSectionItems[sectionItem.ItemID] = sectionItem 
      }
    }

    // #region index handling
    const ValidIndex = computed((): boolean => {
      if (
        sectionIndex.value !== -1 &&
        sectionIndex.value <= courseModuleData.value.moduleSections.length - 1
      ) {
        const section =
          courseModuleData.value.moduleSections[sectionIndex.value];
        if (
          sectionItemIndex.value !== -1 &&
          sectionItemIndex.value <= section.SectionItems.length - 1
        ) {
          return true;
        }
      }
      return false;
    });

    const SectionChange = (sectionindex: number) => {
      sectionItemIndex.value = -1;
      SelectedDocID.value = -1;
      sectionIndex.value = sectionindex;
    };
    const SectionItemChange = (newsectionitemindex: number) => {
      sectionItemIndex.value = newsectionitemindex;
    };
    // #endregion

    // #region mutations
    const AddNewSection = () => {
      Saved.value = false;
      const newSection: CourseModuleSection = {
        SectionID: -1,
        courseModuleID: courseModuleData.value.courseModuleID,
        SectionName: "",
        SectionItems: []
      };
      courseModuleData.value.moduleSections.push(newSection);
    };

    const NewSectionItem = () => {
      if (
        sectionIndex.value !== -1 &&
        courseModuleData.value.moduleSections.length > 0
      ) {
        Saved.value = false;
        const newSectionitem: CourseModuleSectionItems = {
          ItemID: -1,
          SectionID:
            courseModuleData.value.moduleSections[sectionIndex.value].SectionID,
          Item: "",
          ItemLink: "",
          ItemResourceID: -1,
          ItemType: -1
        };
        courseModuleData.value.moduleSections[
          sectionIndex.value
        ].SectionItems.push(newSectionitem);
        return;
      }
    };

    const DeleteSection = (sectionindex: number) => {
      if (!ValidIndex.value) {
        return;
      }
      const ConfirmDelete = confirm(
        "Are you sure you want to delete the entire section?"
      );
      if (ConfirmDelete) {
        Saved.value = false;
        try {
          const section = courseModuleData.value.moduleSections[sectionindex];

          if (section.SectionID !== -1) {
            if (!(section.SectionID in deletedModuleSections)) {
              deletedModuleSections[section.SectionID] = section
            }
            if (section.SectionID in updatedModuleSections) {
              delete updatedModuleSections[section.SectionID]
            }
          }
          courseModuleData.value.moduleSections.splice(sectionindex, 1);
          if (
            sectionIndex.value >= courseModuleData.value.moduleSections.length
          ) {
            sectionIndex.value =
              courseModuleData.value.moduleSections.length - 1;
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const DeleteSectionItem = (sectionindex: number, itemindex: number) => {
      if (!ValidIndex.value) {
        return;
      }
      try {
        Saved.value = false;
        const sectionitem = courseModuleData.value.moduleSections[sectionindex].SectionItems[itemindex];

        if (sectionitem.ItemID !== -1) {
          if (!(sectionitem.ItemID in deletedModuleSectionItems)) {
              deletedModuleSectionItems[sectionitem.ItemID] = sectionitem
          }
          if (sectionitem.ItemID in updatedModuleSectionItems) {
            delete updatedModuleSectionItems[sectionitem.ItemID]
          }
        }

        courseModuleData.value.moduleSections[sectionindex].SectionItems.splice(
          itemindex,
          1
        );
        sectionItemIndex.value = -1;
      } catch (error) {
        console.error(error);
      }
    };

    const updateItemResourceIdSelection = (newItemResourceID: number) => {
      try {
        const sectionItem =
          courseModuleData.value.moduleSections[sectionIndex.value]
            .SectionItems[sectionItemIndex.value];
        sectionItem.ItemResourceID = newItemResourceID;

        // add sectionitem to updated list
        UpdatedSectionItem(sectionItem);
      } catch (error) {
        console.error(error);
      }
    };
    const updateItemLink = () => {
      try {
        const sectionItem =
          courseModuleData.value.moduleSections[sectionIndex.value]
            .SectionItems[sectionItemIndex.value];
        if (sectionItem.ItemType === CourseModuleItemEnum.Link) {
          sectionItem.ItemLink = itemlink.value;

          // add sectionitem to updated list
          UpdatedSectionItem(sectionItem);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const updateItemType = (itemtype: number) => {
      try {
        Saved.value = false;
        const sectionItem = courseModuleData.value.moduleSections[sectionIndex.value].SectionItems[
          sectionItemIndex.value
        ]
        sectionItem.ItemType = itemtype;

        // add sectionitem to updated list
        UpdatedSectionItem(sectionItem);
      } catch (error) {
        console.error(error);
      }
    };

    // #endregion

    // #region computation
    const DisableAttachArea = computed(() => {
      if (sectionIndex.value !== -1 && sectionItemIndex.value !== -1) {
        return true;
      }
      return false;
    });

    const AddOptionLabel = computed(() => {
      try {
        const optionlist = [0, 1, 2];
        if (
          courseModuleData.value.moduleSections[sectionIndex.value] ===
          undefined
        ) {
          return "Add ...";
        }
        if (
          courseModuleData.value.moduleSections[sectionIndex.value]
            .SectionItems[sectionItemIndex.value] === undefined
        ) {
          return "Add ...";
        }
        const sectionItem =
          courseModuleData.value.moduleSections[sectionIndex.value]
            .SectionItems[sectionItemIndex.value];

        if (optionlist.includes(sectionItem.ItemType)) {
          if (sectionItem.ItemType === 0) {
            addOption.value = 0;
            return "Documents";
          } else if (sectionItem.ItemType === 1) {
            addOption.value = 1;
            return "Question Set";
          } else if (sectionItem.ItemType === 2) {
            addOption.value = 2;
            return "Link";
          }
        }
      } catch (error) {
        console.error(error);
      }
      addOption.value = -1;
      return "Add ...";
    });

    const searcheddocuments = computed(() => {
      if (searchvalue.value !== "") {
        return documents.value.filter((doc: documentType) => {
          return doc.name
            .replace(/ /g, "")
            .toUpperCase()
            .includes(searchvalue.value.replace(/ /g, "").toUpperCase());
        });
      }
      return documents.value;
    });

    const searchedquestionsets = computed(() => {
      if (searchvalue.value !== "") {
        return questionsets.value.filter((qs: QuestionSet) => {
          return qs.Tittle.replace(/ /g, "")
            .toUpperCase()
            .includes(searchvalue.value.replace(/ /g, "").toUpperCase());
        });
      }
      return questionsets.value;
    });

    const SectionItemDocID = computed(() => {
      if (!ValidIndex.value) {
        return;
      }
      try {
        const sectionItem =
          courseModuleData.value.moduleSections[sectionIndex.value]
            .SectionItems[sectionItemIndex.value];
        return sectionItem.ItemResourceID;
      } catch (error) {
        console.error(error);
        return -1;
      }
    });

    const SectionItemQSID = computed(() => {
      if (!ValidIndex.value) {
        return;
      }
      try {
        const sectionItem =
          courseModuleData.value.moduleSections[sectionIndex.value]
            .SectionItems[sectionItemIndex.value];
        return sectionItem.ItemResourceID;
      } catch (error) {
        console.error(error);
        return -1;
      }
    });

    // #endregion

    const Save = () => {
      if (Saved.value === false) {
        if (props.CourseModuleAction === 0) {
          CreateCourseModule(courseModuleData.value);
          return;
        }
        const EditData = {
          courseModule: courseModuleData.value,
          updatedsections: updatedModuleSections,
          updatedsectionitems: updatedModuleSectionItems,
          deletedsections: deletedModuleSections,
          deletedsectionitems: deletedModuleSectionItems
        }
        UpdateCourseModule(EditData);
        // console.log("New: ", courseModuleData.value)
        // console.log("up_sections: ", updatedModuleSections)
        // console.log("up_sections_Item: ", updatedModuleSectionItems)
        // console.log("up_modulename: ", updatedModuleName.value)
        // console.log("del_sections: ", deletedModuleSections)
        // console.log("del_sectionitems: ", deletedModuleSectionItems)
        // UpdateCourseModule(oldcourseModuleData.value, courseModuleData.value);
        // store.dispatch("UpdateCourseModule", courseModuleData.value);
      }
      Saved.value = true;
    };

    // for handling mulitple links with a single v-model variable
    watch([sectionIndex, sectionItemIndex], () => {
      if (!ValidIndex.value) {
        return;
      }
      try {
        const sectionitem =
          courseModuleData.value.moduleSections[sectionIndex.value]
            .SectionItems[sectionItemIndex.value];
        if (sectionitem.ItemLink) {
          itemlink.value = sectionitem.ItemLink;
        }
      } catch (error) {
        console.error(error);
      }
    });

    const InitilizeCourseModule = () => {
      if (props.CourseModuleAction === 0) {
        courseModuleData.value.courseId = Number(
          router.currentRoute.value.query.cid
        );
        return;
      }

      // editing existing coursemodule
      if (props.CourseModuleAction === 1) {
        if (props.courseModule) {
          courseModuleData.value = props.courseModule;
        }
      }
    };

    onMounted(() => {
      InitilizeCourseModule();
    });

    return {
      Title,
      ModuleName,
      showDropDown,
      sectionIndex,
      courseModuleData,
      AddNewSection,
      DeleteSection,
      Save,
      SectionChange,
      NewSectionItem,
      SectionItemChange,
      sectionItemIndex,
      DeleteSectionItem,
      AddOptionLabel,
      addOption,
      updateItemType,
      DisableAttachArea,
      searcheddocuments,
      searchvalue,
      SelectedDocID,
      itemlink,
      SelectedQSID,
      Added,
      SectionItemDocID,
      updateItemResourceIdSelection,
      searchedquestionsets,
      SectionItemQSID,
      updateItemLink,
      Saved,
      UpdatedSection,
      UpdatedSectionItem
    };
  }
});
</script>

<style scoped>
.addcoursemodule-container {
  display: flex;
  flex-direction: column;
  width: 93%;
  height: 100%;
  padding: 1%;
  padding-top: 0;
  color: #969696;
}

.addcoursemodule-container .row .title {
  padding: 0;
  border-bottom: 1px solid #777777;
  padding-bottom: 1%;
}

.addcoursemodule-container .row {
  flex-direction: row;
  width: 100%;
  padding: inherit;
}

.addcoursemodule-module-data {
  width: 50%;
  padding-left: 0;
  border-left: 1px solid #969696a9;
}
.addcoursemodule-module-attachments {
  width: 50%;
  min-height: 40vh;
  border-left: 1px solid #969696a9;
  position: relative;
}

.addcoursemodule-module-attachments.disabled::after {
  content: "Choose Section Item...";
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.651);
  opacity: 0.7;
  z-index: 10;
  font-size: 1.4rem;
}

.modulename {
  padding-right: 1.25rem;
  width: 100%;
  cursor: text;
  display: table-cell;
  padding-top: 0.75rem;
  position: relative;
  word-break: break-word;
  z-index: 1;
}

.module-input-inner {
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.44444;
}

.module-name-container {
  display: table;
  min-height: 3.375rem;
  table-layout: fixed;
  transition: none 0.3s ease-out;
  transition-property: background;
  width: 100%;
  padding-left: 1%;
}

.module-input {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: pre-wrap;
  word-wrap: break-word;
  border-left: none;
  border-top: none;
  border-right: none;
  width: 85%;
}

.module-input:focus {
  outline: none;
}

.module-sections-container {
  width: 100%;
  display: flex;
  padding-left: 1%;
  padding-top: 4%;
  flex-direction: column;
}

.module-sections-header {
  width: 100%;
  display: flex;
  justify-content: center;
}

.module-sections-header ul,
.module-section-items-container ul {
  display: flex;
  width: 100%;
  white-space: nowrap;
  height: fit-content;
  padding: 1% 1%;
  flex-wrap: wrap;
  max-height: 9rem;
  overflow-y: scroll;
}

.module-sections-header ul::-webkit-scrollbar,
.module-section-items-container ul::-webkit-scrollbar {
  width: 2px;
  height: 0.3rem;
  margin-top: 1%;
}

.module-sections-header ul::-webkit-scrollbar-thumb,
.module-section-items-container::-webkit-scrollbar {
  background: rgb(177, 176, 176);
  border-radius: 9px;
}

.module-sections-header ul li,
.module-section-items-container ul li {
  height: 2.5em;
  border-bottom: 5px solid transparent;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: all 0.3s;
  min-width: max-content;
  width: 100%;
  justify-content: space-between;
  min-width: 25%;
  margin-bottom: 1%;
  max-width: 40%;
  border-bottom: 1px solid transparent;
  margin-right: 3%;
  padding: 0 1%;
  border-radius: 15px;
  transition: all 0.3s;
}

.module-sections-header ul li input,
.module-section-items-container ul li input {
  width: 85%;
  border: none;
  background: transparent;
  outline: none;
}

.module-sections-header ul li span,
.module-section-items-container ul li span {
  width: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.module-sections-header ul li input:focus,
.module-section-items-container ul li input:focus {
  outline: none;
}

.module-sections-header ul li input:disabled:hover,
.module-section-items-container ul li input:disabled:hover {
  cursor: pointer;
}

.module-sections-header ul li:hover,
.module-section-items-container ul li:hover {
  border-bottom: 1px solid #969696a9;
  cursor: pointer;
}

.module-sections-header ul li.active,
.module-section-items-container ul li.active {
  border-bottom: 1px solid #969696a9;
}

.searchbar-container {
  display: flex;
  justify-content: space-between;
}

.searchbar {
  width: 66%;
  border-radius: 15px;
  border-color: transparent;
  padding: 5px 5px 5px 15px;
  outline: none;
}

.searchbar:focus {
  border-color: transparent;
  outline: none;
}

.search-type-dropdown-container {
  display: flex;
  border-radius: 15px;
  padding: 1% 3%;
  height: 100%;
  width: 26%;
  justify-content: space-between;
  position: relative;
  transition: all 0.3s;
  /* background: white; */
}

.search-type-dropdown-container.top-shadow {
  box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
}

.search-type-dropdown-container:hover {
  cursor: pointer;
}

.search-type-dropdown-container ul {
  display: block;
  position: absolute;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  left: 0%;
  border-radius: 15px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  top: 42%;
  padding-top: 20%;
}

.search-type-dropdown-container ul li {
  height: 2rem;
  margin-bottom: 1%;
}

.search-type-dropdown-container ul li {
  height: 2rem;
  margin-bottom: 1%;
  display: flex;
  align-items: center;
  padding: 1%;
}

.search-type-dropdown-container ul li:hover {
  background: rgba(245, 245, 245, 0.137);
  border-bottom: 1px solid #969696a9;
}

.search-type-dropdown-container ul li.active {
  border-bottom: 1px solid #969696a9;
}

.desc-container {
  height: 2.5rem;
  display: flex;
}

.desc-container h5 {
  margin-right: 3%;
  margin-bottom: 0;
}

.desc-container .icon-container {
  height: 1.4rem;
  width: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  background: #3a7892;
}

.desc-container .icon-container span {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  padding-bottom: 14%;
}

.desc-container .icon-container .icon {
  width: 0.7rem;
  height: 0.7rem;
}

.desc-container .icon-container:hover {
  cursor: pointer;
}

.search-result-container {
  display: flex;
  width: 100%;
  padding-top: 5%;
  justify-content: space-between;
  height: 90%;
}

.search-result-inner {
  width: 67%;
}

.search-result-inner ul {
  height: fit-content;
  padding: 1% 1%;
  flex-wrap: wrap;
  max-height: 19rem;
  overflow-y: scroll;
}

.search-result-inner ul::-webkit-scrollbar {
  width: 2px;
  height: 0.3rem;
  margin-top: 1%;
}

.search-result-inner ul::-webkit-scrollbar-thumb {
  background: rgb(177, 176, 176);
  border-radius: 9px;
}

.search-result-inner ul li {
  height: 2.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 1%;
  padding: 0 2%;
  transition: all 0.3s;
}

.search-result-inner ul li.active {
  background: rgba(173, 216, 230, 0.219);
}

.search-result-inner ul li:hover {
  background: rgba(173, 216, 230, 0.219);
  cursor: pointer;
}

.search-result-actions {
  width: 26%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
}

.search-result-action-btn {
  width: 100%;
  height: 2.5rem;
  border-radius: 15px;
  padding: 1% 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
  transition: all 0.3s;
}

.search-result-action-btn:hover {
  cursor: pointer;
  background: whitesmoke;
}

.search-result-link-container {
  height: 100%;
  display: flex;
  justify-content: center;
}

.search-result-link-container input {
  width: 100%;
  border-radius: 15px;
  border-color: transparent;
  padding: 5px 5px 5px 15px;
  outline: none;
  height: 2.5rem;
}
</style>
