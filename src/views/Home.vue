<template>
  <div class="Checkbox">
    <h1>Checkbox</h1>
    <button @click="callAPI()">CallAPI</button>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  methods: {
    callAPI() {
      fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": "SkNZ7XOnPO1NS2QaiWWdg579PLTLtodHjImoGAA2" }
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>
