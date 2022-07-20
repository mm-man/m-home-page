<template>
  <el-container class="m-container" @mousewheel="onMousewheel_ConTainer">  
    <el-aside @mousewheel="onMousewheel_Aside">
      <div v-for="(v, k) in aside_arr" :key="k" :class="`item ${keys[k_index] == k ? 'active' : ''}`"
        @click="k_index = getIndexByKey(k)"
      >
        {{ v }}
      </div>
    </el-aside>
    <el-container>
      <el-header>
        {{aside_arr[keys[k_index]]}}
      </el-header>
      <el-main>
        <el-input  v-model="input" placeholder="搜索"  size="large" :suffix-icon="Search"
          @keyup.enter="onkeyUp_Enter_Input($event)"
        >
        </el-input>
        <!-- 网站 -->
        <el-container class="website-list" v-show="type == 1">
          <div class="item" v-for="(v, i) of website_list" :key="i"
            @click="windowOpen(v[0])"
          >
            <el-avatar :src="v[2]" shape="square" />
            <div class="text" :title="v[1]">{{ v[1] }}</div>
          </div>
        </el-container>
        <!-- 文章 -->
        <el-container class="article-list" v-show="type == 2">
          <div v-for="(v, i) of article_list" :key="i" class="item" :title="v[1]"
            @click="windowOpen(v[0])"
          >{{v[1]}}
          </div>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed} from "vue";
import { Search } from "@element-plus/icons-vue";
import website_data_ from "@/data/website";
import article_data_ from "@/data/article";

onMounted(()=>{  onkeyUp_Windows() })

const website_data = reactive(Object.assign({},website_data_))
const article_data = reactive(Object.assign({},article_data_))

let type = ref(1); // 1. 网站  2.文章

const input = ref("");
const aside_arr = {
  life: "生活",
  work: "工作",
  code: "代码",
};
const keys = Object.keys(aside_arr)
let k_index = ref(0)
let website_list = computed(()=>{
  return website_data[keys[k_index.value]]
})

let article_list = computed(()=>{
  return article_data[keys[k_index.value]]
})

function getIndexByKey(key) {
  let index = 0
  keys.some((k,i) => {
    if(k == key){
      index = i
      return true
    }
  })
  return index
}

function reset(){
  website_data_[keys[k_index.value]].forEach((v,i) => {
    website_data[keys[k_index.value]][i] = v
  })
  article_data_[keys[k_index.value]].forEach((v,i) => {
    article_data[keys[k_index.value]][i] = v
  })
  console.log(website_list.value, article_list.value);
}
function onkeyUp_Enter_Input() {
  if (/^cls/.test(input.value)){
    reset()
    return 
  }
  if (/^i /.test(input.value)){
    const input_code = input.value.split(' ')[1]
    const index = getIndexByKey(input_code)
    k_index.value = index
  } else if (/^t /.test(input.value)){
    const input_code = input.value.split(' ')[1]
    if (input_code == 'w'){
      type.value = 1
    } else if (input_code == 'a') {
      type.value = 2
    }
  } else if (/^s /.test(input.value)){
    const input_code = input.value.split(' ')[1]
    if (type.value == 1){ // 网站
      website_data[keys[k_index.value]]  = website_data[keys[k_index.value]].filter(r => r[1].indexOf(input_code) != -1)
    } else if (type.value == 2) { // 文章
      article_data[keys[k_index.value]] = article_data[keys[k_index.value]].filter(r => r[1].indexOf(input_code) != -1)
    }
  } else {
    window.open( `https://www.baidu.com/s?tn=68018901_2_oem_dg&ie=utf-8&wd=${input.value}`);
  }
}

function onkeyUp_Windows() {
  window.addEventListener('keyup', (e)=>{
    if(e.key == 'ArrowUp'){
      doChangeKIndex(false)
    }
    if (e.key == 'ArrowDown'){
      doChangeKIndex(true)
    }
    if (e.key == 'ArrowRight'){
      doChanegType()
    }
    if (e.key == 'ArrowLeft'){
      doChanegType()
    }

  })
}

function doChanegType(){
  if (type.value == 1){
    type.value = 2
  } else{
    type.value = 1
  }
}

function windowOpen(url){
  window.open(url)
}

function onMousewheel_Aside(event) {
  doChangeKIndex(event.wheelDelta < 0)
}

function doChangeKIndex(isDown){
  if (isDown) { //向下
    if(k_index.value == keys.length - 1) k_index.value = 0
    else k_index.value++
  } else { // 向上
    if(k_index.value == 0) k_index.value = keys.length - 1
    else k_index.value--
  }
}

function onMousewheel_ConTainer(event){
  doChangeKIndex(event.wheelDelta < 0)
}

</script>

<style lang="scss" scoped>
.m-container {
  background-image: linear-gradient(
      rgba(34, 34, 34, 0.3),
      rgba(34, 34, 34, 0.3)
    ),
    url(https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wyTt?ver=4b9e);
  background-size: cover;
  height: 100%;
  // background-color: var(--el-color-primary-light-3);
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: #fff;
    font-weight: bold;
    font-size: x-large;
  }
  .el-aside {
    position: absolute;
    width: fit-content;
    height: 100vh;
    background-color: rgba(1, 1, 1, 0.4);
    padding: 0.5em 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
    .item {
      cursor: pointer;
      padding: 0.5em 0;
      color: #fff;
      width: 6em;
      border-radius: 4px;
      text-align: center;
      &:hover {
        background-color: rgba(169, 175, 176, 0.2);
      }
      &.active {
        background-color: rgba(169, 175, 176, 0.4);
      }
    }
  }
  .el-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-input {
      width: 32vw;
      // height: 2.5em;
      line-height: 2.5em;
      font-size: 1em;
    }
    .website-list {
      width: 75vw;
      flex-wrap: wrap;
      display: flex;
      align-content: flex-start;
      margin-top: 3em;
      .item {
        text-align: center;
        height: fit-content;
        border: 1px solid rgba(255, 255, 255, 0);
        padding: 0.6em 0;
        border-radius: 10px;
        cursor: pointer;
        .el-avatar {
          vertical-align: top;
          width: 45px;
          height: 45px;
          border-radius: 18%;
          background-color: rgba(1, 1, 1, 0);
        }
        .text {
          // background-color: var(--el-color-success-dark-2);
          color: var(--el-color-info-light-9);
          font-size: 0.8em;
          border-radius: 4px;
          font-weight: bold;
          width: 8em;
          margin-top: 2px;
          font-size: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
      }
    }
    .article-list {
      width: 75vw;
      flex-wrap: wrap;
      display: flex;
      align-content: flex-start;
      margin-top: 3em;
      background-color: rgba(1,1,1,.5);
      padding: 1em;
      .item {
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        background-color: rgba(200,200,200,.4);
        padding: 2px 6px;
        border-radius: 3px;
        margin: 4px;
        width: 13.6vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
