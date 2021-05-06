<template>
  <v-app>
    <v-container>
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">ギア投稿</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-file-input
              @change="setImage"
              accept="image/png, image/jpeg, image/bmp"
              outlined
              label="商品画像"
            />
            <v-text-field
              v-model="name"
              placeholder="例:アルパインダウンハガー800 #0"
              label="商品名"
            />
            <v-textarea
              v-model="details"
              placeholder="例:ダウン素材で軽く、氷点下でも暖かい冬用寝袋"
              label="商品詳細"
            />
            <v-text-field
              v-model.number="size"
              placeholder="例:300"
              label="サイズ"
            />
            <v-text-field
              v-model.number="weight"
              placeholder="例:1000"
              label="重量"
            />
            <v-text-field
              v-model.number="price"
              placeholder="例:50000"
              label="商品価格"
            />
            <v-select
              v-model="category"
              :items="categoryList"
              label="カテゴリー"
            />
            <v-select v-model="maker" :items="makerList" label="販売メーカー" />
            <v-card-actions>
              <v-btn
                color="light-green darken-1"
                class="white--text"
                @click="gearCreate"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      image: "",
      details: "",
      size: "",
      weight: "",
      price: "",
      categoryList: [
        "寝具",
        "テント/タープ",
        "ザック",
        "テーブル/チェア",
        "調理器具",
        "テーブルウェア/カトラリー",
        "焚火台",
        "アパレル",
        "その他",
      ],
      makerList: [
        "mont-bel",
        "snow peak",
        "LOGOS",
        "Coleman",
        "CAPTAIN STAG",
        "THE NORTH FACE",
        "DOD",
        "Nordisk",
        "その他",
      ],
    };
  },
  methods: {
    setImage(e) {
      this.image = e;
    },
    gearCreate() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);
      formData.append("details", this.details);
      formData.append("size", this.size);
      formData.append("weight", this.weight);
      formData.append("price", this.price);
      formData.append("category", this.category);
      formData.append("maker", this.maker);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      this.$axios
        .post("api/v1/gears", formData, config)
        .then((res) => {
          console.log(res);
          console.log("投稿が成功しました");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          console.log("投稿失敗");
        });
    },
  },
};
</script>
