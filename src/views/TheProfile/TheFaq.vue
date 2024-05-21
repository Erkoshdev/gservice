<template>
  <div class="page-wrapper">
    <div class="internal-wrapper">
      <div class="internal-sidebar internal-sidebar-left">
        <app-profile-card> </app-profile-card>
        <app-sidebar-nav></app-sidebar-nav>
      </div>
      <div class="internal-content">
        <div class="internal-content-header">
          <b>{{ $t('faq') }}</b>
        </div>
        <div class="internal-content-body">
          <app-accordion class="accordion-sm">
            <app-accordion-item v-for="item in faqList" :key="item.id">
              <template slot="accordion-trigger">
                <p>{{ item.title }}</p>
                <i class="icon"></i>
              </template>
              <template slot="accordion-content">
                <p v-html="item.content"></p>
              </template>
            </app-accordion-item>
          </app-accordion>
        </div>
      </div>
      <div class="internal-sidebar internal-sidebar-right">
        <app-advert-card></app-advert-card>
      </div>
    </div>
  </div>
</template>

<script>
import AppProfileCard from "@/components/AppProfileCard";
import AppSidebarNav from "@/components/AppSidebarNav";
import AppAdvertCard from "@/components/AppAdvertCard";
import AppAccordion from "@/components/Accordion/AppAccordion";
import AppAccordionItem from "@/components/Accordion/AppAccordionItem";
import API from "@/api";

export default {
  name: "TheFaq",

  components: {
    AppProfileCard,
    AppAdvertCard,
    AppSidebarNav,
    AppAccordion,
    AppAccordionItem
  },

  created() {
    this.fetchFaq();
  },

  data() {
    return {
      faqList: [],
    }
  },

  methods: {
    fetchFaq() {
      API.main.getFaq()
          .then((res) => {
            this.faqList = res.guides;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // this.$store.commit("SET_LOADER", false);
          });
    }
  }
}
</script>

<style scoped>

</style>
