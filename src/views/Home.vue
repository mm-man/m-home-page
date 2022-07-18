<template>
  <el-container class="m-container">
    <el-aside>
      <el-tag class="mx-1" size="large">Large</el-tag>
      <el-tag class="mx-1" size="large">Large</el-tag>
      <el-tag class="mx-1" size="large">Large</el-tag>
    </el-aside>
    <el-container>
      <el-header></el-header>
      <el-main>
        <el-input
          v-model="input" type="text" placeholder="搜索" size="large" :suffix-icon="Search"
          @change="clickInput"
        >
        </el-input>
        <el-container class="website-list">
          <div class="item" v-for="(v, i) of website_list" :key="i" @click="websiteClick(v[0])">
            <el-avatar :src="v[2]" shape="square" />
            <div class="text">{{v[1]}}</div>
          </div>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import website_data from '@/data/website'

const input = ref("");
const website_list = reactive(website_data)

function websiteClick (site){
  window.open(site)
}

function clickInput(){
  window.open(`https://www.baidu.com/s?tn=68018901_2_oem_dg&ie=utf-8&wd=${input.value}`)
  
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
    // background-color: var(--el-color-warning-light-9);
  }
  .el-aside {
    position: absolute;
    width: fit-content;
    height: 100vh;
    background-color: var(--el-color-primary-light-8);
    padding: 0.5em 0;
    display: flex;
    flex-direction: column;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
    .el-tag {
      margin: 1px 0 0 0;
      cursor: pointer;
    }
  }
  .el-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-input {
      width: 75vw;
      // height: 2.5em;
      line-height: 2.5em;
      font-size: 1em;
    }
    .website-list {
      width: 75vw;
      flex-wrap: wrap;
      display: flex;
      align-content: flex-start;
      margin-top: 0.5em;
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
          background-color: rgba(24, 97, 119, 0.8);
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
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.4);
          
        }
      }
    }
  }
}
</style>
