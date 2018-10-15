//   这个是为了备份用的
//   这个是为了备份用的
//   这个是为了备份用的
//   这个是为了备份用的
//   这个是为了备份用的
//   这个是为了备份用的
//   这个是为了备份用的
//   这个是为了备份用的
//   这个是为了备份用的
//   这个是为了备份用的
<template>
    <li class="mainCtn compents-li" :class="{pointEventNone: isPointEventNone}" @mousedown="mousedown($event, item)">
        <!-- {{item.icon}} -->
        <div> {{item.text}} </div>
    </li>
</template>

<script>
export default {
  name: 'dragCompent',
  props: {
    item: {
      type: Object,
      default: () => ({text: '', icon: ''})
    }
  },
  data () {
    return {
      isPointEventNone: false
    }
  },
  methods: {
    /*
    ** 
    */
    mousedown: function (event, site) {
      var _this = this
      var _site = site
      var event=event||window.event;
      var _target = event.target.parentElement
      var startx=event.clientX;
      var starty=event.clientY;
      var sb_bkx=startx-event.target.offsetLeft;
      var sb_bky=starty-event.target.offsetTop;
      // 窗口的宽高度
      var ww = document.documentElement.clientWidth;
      var wh = window.innerHeight;
      this.ismoving = true
      // start 这段代码用来复位用的
      var endx=event.clientX-sb_bkx;
      var endy=event.clientY-sb_bky;
    //   _target.style.left=endx+'px';
    //   _target.style.top=endy+'px';
      // end
      
      if (event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        event.returnValue=false;
      };
        document.onmousemove=function (ev) {
          if (_this.ismoving) {
            _this.isPointEventNone = true
            _target.style.zIndex = 1;
            var event=ev||window.event;
            // 控制在浏览器窗口内移动
            if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
              return false;
            };
            // console.log(_target)
            var endx=event.clientX-sb_bkx;
            var endy=event.clientY-sb_bky;
            var _this_left = _target.style.left
            var _this_top = _target.style.top
            console.log('aa' + _this_left)
            _target.style.left=endx+'px';
            _target.style.top=endy+'px';
          }
        }
        document.onmouseup=function (ev) {
          _this.isPointEventNone = false
          _this.ismoving =false
          _target.style.zIndex = '';
          console.log('mouseup')
          document.onmouseup=null;
        }
    }
    // mouseup: function (event, site) {
    //   document.onmousemove=null;
    //   site.isFixed = false;
    //   // console.log(event.target)
    // },

    // mouseover: function (event, site) {
    //   if (localStorage.ismoving == 1) {
    //     // console.log( 'localStorage.initY' + localStorage.initY )
    //     console.log( 'over')
    //     // console.log( event)
    //   }

    //   // console.log('over')

    //   // for(var i = 0; i < this.baseData1.length; i++){
    //   //   this.baseData1[i].showUp = false
    //   // }
    //   // for(var j = 0; j< this.baseData2.length; j++){
    //   //   this.baseData2[j].showUp = false
    //   // }
    //   // site.showUp = true
    // },
    
    // mouseout: function (event, site) {
    //   if (localStorage.ismoving == 1) {
    //     console.log('out')
    //     // console.log( event )
    //     // localStorage.initY = event.y
    //   }
    // }  
    
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
