<template>
  <div id="app">
    <router-link to="/dragDemo">dragDemo</router-link>
    <span style = 'margin-left: 200px;'></span>
    <router-link to="/vueSlicksortPractice">vueSlicksortPractice</router-link>
    <span style = 'margin-left: 200px;'></span>
    <router-link to="/canBack">canBack</router-link>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  data () {
    return {
    }
  }
  // watch: {
  //   list1: {
  //     handler: function (newVal, oldVal) {
  //       console.log('bbbbbb')
  //     },
  //     deep: true
  //   }
  // },
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
  a{
    text-decoration: none;
  }
  *{
    margin: 0;
    padding: 0;
  }
  ul, li {
    list-style: none;
  }
  /*#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }*/
  .ctn{
    line-height: 50px;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
    float: left;
  }
  .sub:hover{
      background: #e6dcdc;
      color: white;
      width: 100px;
  }
  .ctn1{
    border: 1px solid green;
    width: 100px;
  }
  .ctn2{
    border: 1px solid black;
    width: 100px;
    margin-left: 50px;
  }
  .dragCtn{
    width: 100px;
  }
  .fixed{
    position: fixed;
    background: red;
    cursor: move;
    pointer-events: none;
  }
  .fixedCtnBorder{
    border: 1px solid red;
    border-style: dashed;
    width: 100px;
    height: 50px;
  }


body {
  background: #FAFAFF;
  padding: 20px;
  font-family: Helvetica;
}

/*#app {
  background: #EEE;
  border-radius: 4px;
  border: 1px solid #EEE;
  transition: all 0.2s;
}*/

li {
  padding: 20px;
  list-style-type: none;
  cursor: pointer;
  background: #FFF;
  border-bottom: 1px solid #EEE;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

h2 {
  font-weight: bold;
  margin-bottom: 15px;
}

</style>
