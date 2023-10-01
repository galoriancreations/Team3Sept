<template>
  <Page title="Courses" name="challenges">
    <section class="challenges-intro">
      <p>
        Join or create any community below to receive daily tasks that will lead
        you on your journey to change!
      </p>
    </section>
    <!-- <div class="challenges-grid">
      <TopChallengesItem
        v-for="item in challenges"
        :key="item.title"
        :challenge="item"
      />
    </div> -->
    <h2>TIng Global Courses & Challenges</h2>
    <br>
    <br>
    <div class="image-carousel">
      <button id="button" @click="prevPage1" :disabled="currentPage1 === 0"><img :src="arrow" alt="<"></button>
      <div class="images" id="images1">
        <div class="challenges-grid" id="grid1">
          <TopChallengesItem
            v-for="item in ChallengeStars"
            :key="item.title"
            :challenge="item"
          />
        </div>
    </div>
    <button id="button" @click="nextPage1" :disabled="currentPage1 === 2"><img class="arrows" :src="arrow" alt=">"></button>
  </div>
  <br>
  <br>
  <h2 id="h2">popular Courses & Challenges</h2>
    <br>
    <br>
    <div class="image-carousel" id="image-carousel2">
      <button id="button" @click="prevPage2" :disabled="currentPage2 === 0"><img :src="arrow" alt="<"></button>
      <div class="images" id="images2">
        <div class="challenges-grid" id="grid2">
          <!-- {{ this.sortingChallenges }} -->
          <TopChallengesItem 
            v-for="item in rankedChallenge"
            :key="item.title"
            :challenge="item"
          />
        </div>
    </div>
    <button id="button" @click="nextPage2" :disabled="currentPage2 === 2"><img class="arrows" :src="arrow" alt=">"></button>
  </div>
  </Page>
</template>

<script>
import challenges from "~/assets/data/top-challenges";

export default {
  data() {
    return {
      ChallengeStars: [], 
      challenges,
      currentPage1: 0,
      margin1: 0,
      currentPage2: 0,
      margin2: 0,
      rankedChallenge: [],
    };
  },
  computed: {
    arrow() {
      return require('~/assets/images/arrow.png');
    },
    // async sortingChallenges() {
    //   let ChallengeSorted; 
    //   try {
    //     ChallengeSorted = await this.$axios.$post("/api", {
    //       getRankings: 0
    //     });
    //     this.error = null;
    //   } catch (error) {
    //     this.error = error;
    //   }
    //   // debugger
    //   for (let i = 0; i < ChallengeSorted.length; i++) {
    //     let sum = 5
    //     let count = 1
    //     let challengesUsers = ChallengeSorted[i].users
    //     for (let v = 0; v < challengesUsers.length; v++) {
    //       console.log(challengesUsers[v].stars);
    //       sum += challengesUsers[v].stars
    //       console.log(sum);
    //       count++
    //       console.log(count);
    //     }
    //     ChallengeSorted[i].totalRateing = sum/count
    //     console.log(challenges[i].totalRateing);
        
    //   }
    //   ChallengeSorted.sort((a,b)=>{return b.totalRateing - a.totalRateing})
    //   console.log(ChallengeSorted);
    //   this.rankedChallenge = ChallengeSorted
    //   // return ChallengeSorted
    // },

  },
  methods: {
    nextPage1() {
        const page = document.getElementById('grid1');
        const images = document.getElementById('images1')
        if (this.currentPage1 == 0) {
          images.style.padding = '0px 10px 0px 10px'
        }else{
          images.style.padding = '0px 20px 0px 0px'
        }
        
        this.margin1 = this.margin1 -100;
        page.style.marginLeft = `${this.margin1}%`;
        this.currentPage1++;
    },
    prevPage1() {
        const page = document.getElementById('grid1');
        const images = document.getElementById('images1')
        if (this.currentPage1 == 2) {
          images.style.padding = '0px 10px 0px 10px'
        }else{
          images.style.padding = '0px 0px 0px 20px'
        }
        this.margin1 = this.margin1 +100;
        page.style.marginLeft = `${this.margin1}%`;
        this.currentPage1--;
    },
    nextPage2() {
        const page = document.getElementById('grid2');
        const images = document.getElementById('images2')
        if (this.currentPage2 == 0) {
          images.style.padding = '0px 10px 0px 10px'
        }else{
          images.style.padding = '0px 20px 0px 0px'
        }
        
        this.margin2 = this.margin2 -100;
        page.style.marginLeft = `${this.margin2}%`;
        this.currentPage2++;
    },
    prevPage2() {
        const page = document.getElementById('grid2');
        const images = document.getElementById('images2')
        if (this.currentPage2 == 2) {
          images.style.padding = '0px 10px 0px 10px'
        }else{
          images.style.padding = '0px 0px 0px 20px'
        }
        this.margin2 = this.margin2 +100;
        page.style.marginLeft = `${this.margin2}%`;
        this.currentPage2--;
    },
    async sortingChallenges() {
      let ChallengeSorted; 
      try {
        ChallengeSorted = await this.$axios.$post("/api", {
          getRankings: 0
        });
        this.error = null;
      } catch (error) {
        this.error = error;
      }
      // debugger
      for (let i = 0; i < ChallengeSorted.length; i++) {
        let sum = 5
        let count = 1
        let challengesUsers = ChallengeSorted[i].users
        for (let v = 0; v < challengesUsers.length; v++) {
          console.log(challengesUsers[v].stars);
          sum += challengesUsers[v].stars
          console.log(sum);
          count++
          console.log(count);
        }
        ChallengeSorted[i].totalRateing = sum/count
        console.log(challenges[i].totalRateing);
        
      }
      ChallengeSorted.sort((a,b)=>{return b.totalRateing - a.totalRateing})
      console.log(ChallengeSorted);
      this.rankedChallenge = ChallengeSorted
      // return ChallengeSorted
    },
    async Challenges() {
      let ChallengeSorted; 
      try {
        ChallengeSorted = await this.$axios.$post("/api", {
          getRankings: 0
        });
        this.error = null;
      } catch (error) {
        this.error = error;
      }
      // debugger
      for (let i = 0; i < ChallengeSorted.length; i++) {
        let sum = 5
        let count = 1
        let challengesUsers = ChallengeSorted[i].users
        for (let v = 0; v < challengesUsers.length; v++) {
          console.log(challengesUsers[v].stars);
          sum += challengesUsers[v].stars
          console.log(sum);
          count++
          console.log(count);
        }
        ChallengeSorted[i].totalRateing = sum/count
        console.log(challenges[i].totalRateing);
        
      }
      console.log(ChallengeSorted);
      this.ChallengeStars = ChallengeSorted
      // return ChallengeSorted
    },
    
  },
  beforeMount() {
    this.sortingChallenges()
    this.Challenges()
  },
};
</script>

<style lang="scss">
// #grid1{

//   @include respond(tablet) {
//     margin-left: 200%;
//   }

//   @include respond(tablet-sm) {
//     margin-left: 200%;
//   }

//   @include respond(mobile-land) {
//     margin-left: 200%;
//   }

//   @include respond(mobile) {
//     margin-left: 200%;
//   }
// }
#h2{
  @include respond(tablet) {
    display: none;
  }

  @include respond(tablet-sm) {
    display: none;
  }

  @include respond(mobile-land) {
    display: none;
  }

  @include respond(mobile) {
    display: none;
  }
}
#image-carousel2{
  @include respond(tablet) {
    display: none;
  }

  @include respond(tablet-sm) {
    display: none;
  }

  @include respond(mobile-land) {
    display: none;
  }

  @include respond(mobile) {
    display: none;
  }
}
.image-carousel {
  display: flex;
  align-items: center;
}

.images {
  // overflow: hidden; /* Hide overflowing content */
  overflow-x: clip;
  position: relative; /* Needed for absolute positioning */
  // z-index: 1;
  width: 100%;
  height: 100%;
  padding: 0px 0px 0px 20px;
  // padding: 60px;
  @include respond(tablet) {
    overflow-x: unset;
  }

  @include respond(tablet-sm) {
    overflow-x: unset;
  }

  @include respond(mobile-land) {
    overflow-x: unset;
  }

  @include respond(mobile) {
    overflow-x: unset;
  }
}

.image-wrapper {
  display: flex;
  transition: transform 0.5s ease; /* Add a transition for smooth sliding */
}

#button {
  cursor: pointer;
  // background-color: #007bff;
  // color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  @include respond(tablet) {
    display: none;
  }

  @include respond(tablet-sm) {
    display: none;
  }

  @include respond(mobile-land) {
    display: none;
  }

  @include respond(mobile) {
    display: none;
  }
}

button:disabled {
  // background-color: #ccc;
  opacity: 0.3;
  cursor: not-allowed;
}
.arrows{
  transform: rotate(180deg);
}

button:disabled {
  // background-color: #ccc;
  opacity: 0.3;
  cursor: not-allowed;
}
.challenges-intro {
  max-width: 80rem;
  margin: auto;
  font-size: 2rem;
  text-align: center;
  line-height: 1.7;
  margin-bottom: 8rem;

  @include respond(mobile) {
    font-size: 1.6rem;
    margin-bottom: 6rem;
  }

  p {
    font-size: inherit;
    line-height: inherit;
  }
}

.challenges-grid {
  // z-index: 1;
  position: relative;
  display: grid;
  width: 300%;
  transition: all 1s;
  grid-template-columns: repeat(18, 1fr);
  gap: 3rem;

  @include respond(tablet) {
    width: auto;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;
  }

  @include respond(tablet-sm) {
    width: auto;
    gap: 3rem;
  }

  @include respond(mobile-land) {
    width: auto;
    gap: 2.5rem;
  }

  @include respond(mobile) {
    width: auto;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
</style>
