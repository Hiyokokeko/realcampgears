<template>
  <v-app>
    <v-container>
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">ギア投稿</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="gear.name"
              placeholder="例:アルパインダウンハガー800 #0"
              label="商品名"
            />
            <v-textarea
              v-model="gear.details"
              placeholder="例:ダウン素材で軽く、氷点下でも暖かい冬用寝袋"
              label="商品詳細"
            />
            <v-text-field
              v-model.number="gear.size"
              placeholder="例:375(w)×440(d)×210(h)cm"
              label="サイズ"
            />
            <v-text-field
              v-model.number="gear.weight"
              placeholder="例:1,060g"
              label="重量"
            />
            <v-text-field
              v-model.number="gear.price"
              placeholder="例:¥50,000"
              label="商品価格"
            />
            <v-select
              v-model="gear.category"
              :items="gear.category"
              label="カテゴリー"
            />
            <v-select
              v-model="gear.maker"
              :items="gear.maker"
              label="販売メーカー"
            />
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
      gear: {
        name: "",
        details: "",
        size: "",
        weight: "",
        price: "",
        category: [
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
        maker: [
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
      },
    };
  },
  methods: {
    gearCreate() {
      this.$axios
        .post("api/v1/gears", this.gear)
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
