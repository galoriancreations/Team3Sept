<template>
  <div class="top-challenges__item">
    <div class="top-challenges__img" >
      <img :src="image" :alt="challenge.title" @click="showModal = true"/>
      <h5 class="creator_name" @click="showModal = true">TIng Global Courses & Challenges</h5>
    
    <div style="z-index: 1;">
      <button class="top-challenges__stars" @click="rankingchallnges(1)"><img v-if="challenge.totalRateing > 1" :src="star" :alt="'1'" /><img v-else="challenge.totalRateing > 1" :src="darkstar" :alt="'1'" /></button>
      <button class="top-challenges__stars" @click="rankingchallnges(2)"><img v-if="challenge.totalRateing > 1.5" :src="star" :alt="'2'" /><img v-else="challenge.totalRateing > 2" :src="darkstar" :alt="'1'" /></button>
      <button class="top-challenges__stars" @click="rankingchallnges(3)"><img v-if="challenge.totalRateing > 2.5" :src="star" :alt="'3'" /><img v-else="challenge.totalRateing > 3" :src="darkstar" :alt="'1'" /></button>
      <button class="top-challenges__stars" @click="rankingchallnges(4)"><img v-if="challenge.totalRateing > 3.5" :src="star" :alt="'4'" /><img v-else="challenge.totalRateing > 4" :src="darkstar" :alt="'1'" /></button>
      <button class="top-challenges__stars" @click="rankingchallnges(5)"><img v-if="challenge.totalRateing > 4.5" :src="star" :alt="'5'" /><img v-else="challenge.totalRateing > 4.5" :src="darkstar" :alt="'1'" /></button>
    </div>
  </div
  >
    
    <PopupModal
      :active="showModal"
      class="top-challenges__modal"
      :height="modalHeight"
    >
      <h2 class="top-challenges__title">
        {{ challenge.title }}
      </h2>
      <div class="top-challenges__text">
        <p v-for="paragraph in text" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
      <div class="top-challenges__buttons">
        <BaseButton
          v-if="!exapnd && !isLoggedIn"
          :variant="link ? 'blue' : 'darkblue'"
          @click="notLoggedIn"
        >
          <i v-if="loading" class="fas fa-circle-notch fa-spin" />
          <span v-else>{{ challenge.linkText || "Join a challenge" }}</span><!-- g -->
        </BaseButton>
        <BaseButton
          v-if="!exapnd && isLoggedIn"
          :variant="link ? 'blue' : 'darkblue'"
          @click="buttonClickHandler"
        >
          <i v-if="loading" class="fas fa-circle-notch fa-spin" />
          <span v-else>{{ challenge.linkText || "Join a challenge" }}</span><!-- g -->
        </BaseButton>
        <BaseButton v-if="!link && !isLoggedIn" variant="blue" @click="notLoggedIn">
          <i v-if="creating" class="fas fa-circle-notch fa-spin" />
          <span v-else>Create a challenge</span>
        </BaseButton>
        <BaseButton v-if="!link && isLoggedIn" variant="blue" @click="createChallenge">
          <i v-if="creating" class="fas fa-circle-notch fa-spin" />
          <span v-else>Create a challenge</span>
        </BaseButton>
      </div>
      <div v-if="exapnd" class="top-challenges__list-wrapper">
        <SectionSeperator />
        <h3 v-if="!error" class="top-challenges__list-title">
          Choose a challenge:
        </h3>
        <ErrorMessage v-if="error" :error="error" />
        <div v-else class="top-challenges__list">
          <v-app>
            <v-data-table
              :headers="tableHeaders"
              :items="challengeItems"
              class="elevation-2"
              hide-default-footer
              disable-pagination
            >
              <template v-slot:[`item.link`]="{ item }">
                <DashboardButton
                  type="join"
                  :showLabel="false"
                  @click="joinChallenge(item.link)"
                />
              </template>
            </v-data-table>
          </v-app>
        </div>
      </div>
      <!-- <BaseButton v-if="!link" variant="blue" @click="createChallenge">
        <i v-if="creating" class="fas fa-circle-notch fa-spin" />
        <span v-else>Create a challenge</span>
      </BaseButton> -->
    </PopupModal>
  </div>
</template>

<script>
import popupModal from "~/mixins/popup-modal";
import moment from "moment";

export default {
  mixins: [popupModal],
  props: {
    challenge: Object
  },
  data() {
    return {
      exapnd: false,
      challenges: [],
      loading: false,
      creating: false,
      error: null,
      modalHeight: null
    };
  },
  computed: {
    image() {
      return require(`~/assets/images/logos/${this.challenge.image}`);
    },
    star() {
      return require('~/assets/images/star.png');
    },
    darkstar() {
      return require('~/assets/images/darkstar.png');
    },
    text() {
      return this.challenge.text.split("\n");
    },
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    link() {
      return this.challenge.link;
    },
    tableHeaders() {
      return [
        { text: "Organization", value: "creator" },
        { text: "Language", value: "language" },
        { text: "Start date", value: "start" },
        { text: "Join", value: "link", sortable: false, align: "center" }
      ];
    },
    challengeItems() {
      return this.challenges.map(challenge => ({
        ...challenge,
        start: moment(new Date(challenge.date)).format("ll"),
        link: challenge.platforms.wa.invite
      }));
    }
  },
  methods: {
    notLoggedIn() {
      this.$router.replace("/login");
    },
    async rankingchallnges(value) {
      // this.$cookies.get
      const userId = this.$cookies.get("userId")
      try {
          this.challenges = await this.$axios.$post("/api", {
            rankStars: {names:this.challenge.names || [this.challenge.title],star:value,user:userId}
          });
          this.error = null;
        } catch (error) {
          this.error = error;
        }
    },
    async buttonClickHandler() {
      if (this.challenge.link) {
        this.$router.push(this.challenge.link);
      } else if (!this.loading) {
        this.loading = true;
        try {
          this.challenges = await this.$axios.$post("/api", {
            getChallengesByName: this.challenge.names || [this.challenge.title]
          });
          this.error = null;
        } catch (error) {
          this.error = error;
        }
        this.exapnd = true;
      }
    },
    joinChallenge(link) {
      window.open(link, "_blank");
    },
    async createChallenge() {
      this.creating = true;
      try {
        const templateId = await this.$axios.$post("/api", {
          getPublicTemplateID: this.challenge.names || [this.challenge.title]
        });
        this.$cookies.set("selectedTemplate", templateId);
        this.$cookies.remove("draftId");
        this.$cookies.remove("challengeId");
        this.$router.push("/editor");
      } catch (error) {
        this.exapnd = true;
        this.error = error;
        this.creating = false;
      }
    }
  },
  watch: {
    exapnd(value) {
      if (value) {
        this.modalHeight = "85vh";
      }
    }
  },
  mounted() {
    const height = this.$el.querySelector(".modal__wrapper")?.offsetHeight;
    if (height) {
      this.modalHeight = `${height}px`;
    }
  }
};
</script>

<style lang="scss">
.top-challenges {
  &__img {
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    height: 100%;
    overflow: hidden;
    transition: all 0.4s;
    position: relative;
    z-index: 0;

    &:hover {
      transform: scale(1.2);
      z-index: 3;
    }

    img {
      width: 100%;
      display: block;
      
    }
    .creator_name {
      opacity: 0.5;
    }
    
  }
  &__stars {
    cursor: pointer;
    background-color: none;
    // color: #fff;
    border: none;
    padding: 0px 0px;
    margin: 0px;
    &:hover {
      transform: scale(1.2);
    }
    &:active {
      transform: scale(1);
    }

    img{
      width: 15px;
      // background-color: white;
      display: block;
      
    } 
  }

  &__title {
    color: $color-blue-2;
    font-size: 3.5rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }
  }

  &__text {
    p {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }

  &__modal {
    .section-seperator {
      margin: 5rem 0;

      @include respond(mobile) {
        margin: 3.5rem 0;
      }
    }
  }

  &__buttons {
    margin-top: 3rem;
    display: flex;
    justify-content: center;

    @include respond(mobile-land) {
      flex-direction: column;
      align-items: center;
    }

    .button {
      margin: 0;
      width: 26.5rem;

      @include respond(mobile) {
        width: 100%;
      }

      &:not(:last-child) {
        margin-right: 1rem;

        @include respond(mobile-land) {
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }
    }
  }

  &__list {
    text-align: left;

    .dashboard-button {
      margin: auto !important;
    }
  }

  &__list-title {
    margin-bottom: 2rem;
  }
}
</style>
