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
              accept="image/png, image/jpeg, image/bmp"
              outlined
              label="商品画像"
              @change="setImage"
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
              v-model="size"
              placeholder="例:90×120×255(h)mm(※数値または文字入力)"
              label="サイズ"
            />
            <v-text-field
              v-model="weight"
              placeholder="例:1500(※グラム単位です。数値のみ入力)"
              label="重量"
            />
            <v-text-field
              v-model.number="price"
              placeholder="例:5000(※数値のみ入力)"
              label="商品価格"
            />
            <v-select
              v-model="category"
              :items="categoryList"
              label="カテゴリー"
            />
            <v-select v-model="maker" :items="makerList" label="販売メーカー" />
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="release"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="release"
                  label="発売日"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="release" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(release)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
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
      release: "",
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
      menu: false,
      today: "",
    }
  },
  created() {
    this.today = new Date()
    this.release =
      this.today.getFullYear() +
      "-" +
      Number(this.today.getMonth() + 1) +
      "-" +
      this.today.getDate()
  },
  methods: {
    setImage(e) {
      this.image = e
    },
    gearCreate() {
      const formData = new FormData()
      formData.append("name", this.name)
      formData.append("image", this.image)
      formData.append("details", this.details)
      formData.append("size", this.size)
      formData.append("weight", this.weight)
      formData.append("price", this.price)
      formData.append("release", this.release)
      formData.append("category", this.category)
      formData.append("maker", this.maker)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
      this.$axios
        .post("api/v1/gears", formData, config)
        .then((res) => {
          console.log(res)
          console.log("投稿が成功しました")
          this.$router.push("/")
        })
        .catch((err) => {
          console.log(err)
          console.log("投稿失敗")
        })
    },
  },
}
</script>
