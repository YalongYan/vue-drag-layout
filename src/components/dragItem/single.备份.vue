<template>
  <div @mouseover='mouseover($event, site)' @mouseout='mouseout($event, site)'>
    <!-- 从下往上移动 -->
    <div class="enter-ctn" v-if='site.showUp'>往上移动了</div>
    <!-- <div :class="{ fixedCtnBorder: site.isFixed }">
        <div class="dragCtn" :class="{ fixed: site.isFixed }" @mousedown="mousedown(site, $event)" @mouseup='mouseup(site, $event)' @mouseover='mouseover(site, $event)' @mouseout='mouseout(site, $event)'>
          {{ index }} : {{ site.name }} 
        </div>
    </div> -->
    <div class="dragCtn" :class="{ fixed: site.isFixed }" @mousedown="mousedown($event, site)">
          {{ index }} : {{ site.name }} 
    </div> 
    <!-- 从上往下移动 -->
    <div class="enter-ctn" v-if='site.showDown'>往下移动了</div>
  </div>
</template>

<script>
export default {
  name: 'Single',
  // prop: ['item', 'index'],
  props: {
    baseData1: {
      default: ''
    },
    baseData2: {
      default: ''
    },
    site: {
      default: ''
    },
    index: {
      default: ''
    }
  },
  data () {
    return {
      ismoving: false, //是否在mousedown状态下移动
      isout: false,    //鼠标是否out
      isover: false,   //是否mouseover
      start_y: 0,      //开始的位置, 这里只判断往上 往下移动 所以只跟 y 坐标比较
      init_node: ''    //初始的节点 
    }
  },
  methods: {
    /*
    ** 
    */
    mousedown: function (event, site) {
      // 记录初始 Y 位置
      // localStorage.initY = event.y
      // console.log('localStorage.initY' + localStorage.initY)

      var _this = this
      var _site = site
      var event=event||window.event;
      var _target = event.target
      var startx=event.clientX;
      var starty=event.clientY;
      var sb_bkx=startx-event.target.offsetLeft;
      var sb_bky=starty-event.target.offsetTop;
      var ww=document.documentElement.clientWidth;
      var wh = window.innerHeight;
      this.ismoving = true
      // console.log(this.ismoving)
      // start 这段代码用来复位用的
      var endx=event.clientX-sb_bkx;
      var endy=event.clientY-sb_bky;
      _target.style.left=endx+'px';
      _target.style.top=endy+'px';
      // end

      if (event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        event.returnValue=false;
      };
        var scrolltop=document.documentElement.scrol
        document.onmousemove=function (ev) {
          if (_this.ismoving) {
            //用 localStorage 把move的状态存储起来
            localStorage.ismoving = 1
            // localStorage.initY = ev.y
            // console.log(ev)
            site.isFixed =true
            site.showUp =true
            var event=ev||window.event;
            // console.log(event)
            // var lTop||document.body.scrollTop;
            if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
              return false;
            };
            var endx=event.clientX-sb_bkx;
            var endy=event.clientY-sb_bky;
            _target.style.left=endx+'px';
            _target.style.top=endy+'px';
            // if (localStorage.isover) {
            //   console.log(11)
            // }
          }
        }
        document.onmouseup=function (ev) {
          _this.ismoving =false
          console.log('mouseup')
          document.onmouseup=null;
          localStorage.ismoving = 0
        }
    },
    mouseup: function (event, site) {
      document.onmousemove=null;
      site.isFixed = false;
      // console.log(event.target)
    },

    mouseover: function (event, site) {
      if (localStorage.ismoving == 1) {
        // console.log( 'localStorage.initY' + localStorage.initY )
        console.log( 'over')
        // console.log( event)
      }

      // console.log('over')

      // for(var i = 0; i < this.baseData1.length; i++){
      //   this.baseData1[i].showUp = false
      // }
      // for(var j = 0; j< this.baseData2.length; j++){
      //   this.baseData2[j].showUp = false
      // }
      // site.showUp = true
    },
    
    mouseout: function (event, site) {
      if (localStorage.ismoving == 1) {
        console.log('out')
        // console.log( event )
        // localStorage.initY = event.y
      }
    }  
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.enter-ctn{
    font-size: 12px;
    /*background: white;*/
    border: 1px solid red;
    border-style: dashed;
}
</style>
