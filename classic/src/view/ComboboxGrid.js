Ext.define('Admin.view.ComboboxGrid', {
    extend: 'Ext.form.ComboBox',
    requires: ['Ext.grid.Panel' , 'Ext.button.Button'],
    alias: ['widget.comboboxGrid'],
    multiSelect: true,
    editable: false,
    createPicker: function() {
        var me = this,
        picker,
        menuCls = Ext.baseCSSPrefix + 'menu',
        opts = Ext.apply({
        	/*selModel: 'selModel',{
                mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
            },*/
            selType : 'checkboxmodel',
    		multiSelect : true,
            floating: true,
            hidden: true,
            ownerCt: me.ownerCt,
            cls: me.el.up('.' + menuCls) ? menuCls : '',
            store: me.store,
            displayField: me.displayField,
            focusOnToFront: false,
            //pageSize: me.pageSize,
            bbar: {
	            items:[
	            { 
	            	xtype: 'tbfill'
	            },
	            {
	            	xtype: 'button',
	            	text:'确定',
	            	width: 60,
	            	handler : function() {
	            		me.isSelectOption()
	            	}
	            },{
	            	xtype: 'button',
	            	text:'返回',
	            	width: 60,
	            	handler : function() {
	            		Ext.defer(me.collapse, 1, me);
	            	}
	            }]
            }
        }, me.listConfig, me.defaultListConfig);

		// NOTE: we simply use a grid panel
	    //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
		picker = me.picker = Ext.create('Ext.grid.Panel', opts);
		
		// hack: pass getNode() to the view
		picker.getNode = function() {
		    picker.getView().getNode(arguments);
		};
	
		me.mon(picker, {
	        itemclick: me.onItemClick,
	        refresh: me.onListRefresh,
	        scope: me
	    });
		
	   /* me.mon(picker.getSelectionModel(), {
	        selectionChange: me.onListSelectionChange,
	        scope: me
	    });*/
	    return picker;
    },
    isSelectOption: function(){
    	
    	this.onListSelectionChange(this.picker.getSelectionModel() , this.picker.getSelectionModel().getSelection());
		Ext.defer(this.collapse, 1, this);
    }
});