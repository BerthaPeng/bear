import { _initialize, create, } from 'utils/create_visiable_map';
import clone from 'clone';

var MyMap = function(list){
  this.map = null;
  this.centerPoint = null;
  this.list = list;
  this.markers = [];

  this.d = $.Deferred();
  this.searchMarker = null;
}

MyMap.prototype.initialScope = function(){
  // 添加点聚合
  let self = this;
  let map = this.map;
  let cluster, markers = [];
  this.list.map(n => {
/*    AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {

      //创建SimpleMarker实例
      let marker = new SimpleMarker({
        //前景文字
        iconLabel: n.count,
        //背景图标样式
        iconStyle: 'red',

        //...其他Marker选项...，不包括content
        map: map,
        position: new AMap.LngLat(n.longitude, n.latitude)
      });
      markers.push(marker);
    });*/
    var marker = new AMap.Marker({
        position: new AMap.LngLat(n.longitude, n.latitude),
        offset: {x: -8,y: -34},
        content: '<div class="AMap_marker_box"><div class="count">'+n.count+'</div><div class="AMap_marker"></div></div>',
    });
    markers.push(marker);
  })
  if(cluster){
    cluster.setMap(null);
  }
  map.plugin(["AMap.MarkerClusterer"], function() {
      cluster = new AMap.MarkerClusterer(map, markers);
  });
}

MyMap.prototype.resetScope = function(){
  this.polygon.setPath([]);
  this.list[ this.onEditIndex ].coords = [];
  this.markers.forEach( n => this.map.removeOverlay(n) );
  this.markers = [];
}

MyMap.prototype.getCoords = function(){
  var all_coords = clone(this.list);
  all_coords.forEach( n => {
    n.coords = n.coords && outputPonits( n.coords );
  });
  return all_coords;
}

MyMap.prototype.reset = function(){
  this.list = [];
  this.markers = [];
}

MyMap.prototype._initialize = _initialize;
MyMap.prototype.create = create;

export default new MyMap;