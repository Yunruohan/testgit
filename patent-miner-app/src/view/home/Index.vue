<template>
  <div class="content">
    <div class="title">
      <img src="/static/img/PatentMiner.png"/>
    </div>
    <form>
      <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 input-group">
        <span class="input-group-btn">
          <select class="form-control" name="searchType">
            <option v-for="(value,key) in searchType" :value='key'>{{value}}</option>
          </select>
        </span>
        <input type="text" class="form-control" placeholder="输入关键词试试看" name="keyword"/>
        <span class="input-group-btn">
          <button class="btn btn-primary" type="submit"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        searchType: {
          patent: '搜索专利',
          company: '搜索公司',
          inventor: '搜索发明者',
        },
      };
    },
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/home/index.css";
</style>
