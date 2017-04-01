
/**
 * 地图容器
 */
Ext.define('Admin.view.MapContainer' ,{
    extend: 'Ext.container.Container',
    alias : 'widget.mapContainer',

    frame: true,
    width: "100%",
    region : 'center',
    mainMap : null,
    mapDivId: null,
    
    listeners : {
    	afterrender : function(thisPanel, eOpts) {
    		var me = thisPanel;
    		var dh = Ext.DomHelper; // create shorthand alias
    	    
    	    // specification object
            this.mapDivId = 'semap_' + Ext.id();
    	    var mapDiv = {
    	         id: this.mapDivId,
    	         tag: 'div',
    	         style: 'height:100%;width:100%;z-index:0'
    	    };
	       	    
    	    var mapEl = dh.insertFirst(me.getEl(),  mapDiv);
            var mapinfo = Admin.app.getMapInfo();
    			// 地图属性
    		var mapOpts = {lng: mapinfo.mapCLng, lat: mapinfo.mapCLat, zoom: mapinfo.mapZL};
    		 
    		try{
	    		// 实例化主地图对象
	    		this.mainMap = new SEMap.Map(this.mapDivId, "/hdhnt/js/map");
	    		this.mainMap.initMap(mapOpts);
	
	    		//console.log(this.mainMap._map.getCenterPoint());	    		
	    		this.mainMap.toolWindow = new Admin.view.MapToolWindow({myMap:this.mainMap,renderTo:me.getEl()});	
    		}catch(ex){
    			console.error(ex);
    			Ext.Msg.alert('异常',ex.message);			
    		}
    	},
		resize : function(obj, width, height){	
			if(this.mainMap){				
				this.mainMap.resize(width, height);
			}
		}
	},
    initComponent: function() {		
        this.callParent(arguments);
	},
	
	beforeDestroy: function() {
        var me = this;
        me.mainMap.clearOverLays()
		me.mainMap = null;
        me.callParent();
    }
	
});
