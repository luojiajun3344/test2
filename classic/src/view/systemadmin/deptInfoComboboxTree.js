/**
 * 部门树形下拉框
 */
Ext.define('Admin.view.systemadmin.deptInfoComboboxTree', {
    extend: 'Ext.form.field.ComboBox',
    alias:['widget.deptComboboxTree'],
    //alternateClassName: 'Ext.form.Hidden',

    // private
    inputType : 'deptComboboxTree',
    //hideLabel: true,
    url: '',
    treePanel : {},
    tree: {},
    //textProperty: 'id',
    valueProperty: '',
    treeData: [],
    matchIndex: -1,
    matchNodes: [],
    modifyCombo: false,//是否用于模块的添加或修改操作用的组件，默认false表示查询组件
	defaultListConfig: {
        loadingHeight: 70,
        minWidth: 250,// 下拉框列宽
        maxHeight: 300,
        shadow: 'sides'
    },
    
    initComponent: function () {
        Ext.applyIf(this, {
        	fieldLabel : '部门',
        	valueField: 'deptId',
	        displayField: 'deptName',
            editable: true,
            queryMode: 'remote',
            select: Ext.emptyFn,
            
            typeAhead: true,
            typeAheadDelay: 250,
            triggerAction: 'all',
            minChars: 1
        });
        
        this.displayField = this.displayField || 'text',
        this.treeid = Ext.String.format('tree-combobox-{0}', Ext.id());
        this.tpl = Ext.String.format('<div id="{0}"></div>', this.treeid);

        var me = this;
        var store;
        if (this.url){
        	store =null;// Ext.create('Admin.store.systemadmin.DeptInfoStore');
        }

		this.treePanel = Ext.create('Ext.panel.Panel', {
            autoScroll: false,
            height: 250,
            border: false,
            buttonAlign : 'center',
            checked : null,
			items : [
			this.tree = Ext.create('Ext.tree.TreePanel', {
			        rootVisible: false,
			        autoScroll: true,
			        checkModel : 'cascade',
					//useArrows : true,
	     	        header: false,
			        height: 250,
			        border: false,
			        listeners : {
						checkchange : function(node, checked, eOpts) {
							node.raw.checked = false;				
						}
					},
			        store: store
			    })
			]/*,
			buttons: [
			  	{
					text : '确 定',
					handler : function() {							
						// 得到业户树勾选信息
						var rightArray = me.tree.getView().getChecked();
						var groupStr = [];
						Ext.Array.each(rightArray, function(rec){
							groupStr.push(rec.raw.id);							
		                });
		                
		                me.setValue(groupStr.join(','));
						me.collapse();	
					}
				}
			]*/
        });
        		
        this.tree.on('itemclick', function (view, record) {
        	if(me.modifyCombo == true && record.raw.selectRight == false){     	
        		Ext.Msg.alert('提示','您没有选择此业户组的权限！');
        		return false;
        	}
        	
            me.setValue(record);
            
            me.fireEvent('select', me, record);	//触发选择事件
            
            me.collapse();
        });
        
        me.on('expand', function () {
            if (!this.treePanel.rendered) {
                this.treePanel.render(this.treeid);
            }
        });
        
        me.on('specialkey', function(field, e){  
            if (e.getKey() == e.ENTER) {   
            	if(me.matchNodes.length > 0){
            		me.matchIndex ++;
            		if(me.matchIndex >= me.matchNodes.length){
            			me.matchIndex = 0;
            		}       
            		me.tree.getSelectionModel().select(me.matchNodes[me.matchIndex]); 
            	}
            }      
            me.focus();
            // 很奇妙，这里总是自动坍塌下拉框，此组件在ext4.1下无此问题，到4.2下就有这个问题
            // 暂只能延时展开来解决
            window.setTimeout(function(){
            	me.expand();
            },5);
        });
        
        // 编辑检索事件
        me.on('beforequery', function(qe, eOpts){
        	//console.log(qe);
        	//var combo = qe.combo;
            var q = qe.query;
            //var forceAll = qe.forceAll;
            
            if (q.length >= me.minChars) {
                var rootnode = me.tree.getRootNode();
                
                if (me.lastQuery !== q) {//两次搜索条件不同
                    me.lastQuery = q;
                    
                    me.matchNodes = [];
                    
	                rootnode.cascadeBy(function(rec){
						if(rec.data.text.indexOf(q) != -1)
						{
							me.matchNodes.push(rec);
						}
						return true;
					});
					
					if(me.matchNodes.length > 0){
						me.matchIndex = 0;
						me.tree.getSelectionModel().select(me.matchNodes[me.matchIndex]);
						me.focus();
					}
					
                }else {
                	if(me.matchNodes.length > 0){
	            		me.matchIndex ++;
	            		if(me.matchIndex >= me.matchNodes.length){
	            			me.matchIndex = 0;
	            		}          			
	            		me.tree.getSelectionModel().select(me.matchNodes[me.matchIndex]);
	            		me.focus();
	            	}
                }
            }
            me.expand();
            return false;
        });

        
        this.callParent(arguments);
    },
    
    /**
     * 设置树形下拉框的值
     * @param {gropuid} v
     */
    setTreeValue : function(v) {
    	if(!v)
    		return;
    	var _me = this;
		window.setTimeout(function(){
			if (_me.tree) {					
				var record = _me.tree.getStore().getNodeById(v);
				_me.setValue(record);
				_me.tree.getSelectionModel().select(record);
				_me.tree.getSelectionModel().setLastFocused(record);
			}
		}, 2);
	},
	
	getValue: function() {
        // If the user has not changed the raw field value since a value was selected from the list,
        // then return the structured value from the selection. If the raw field value is different
        // than what would be displayed due to selection, return that raw value.
        var me = this,
            picker = me.picker,
            rawValue = me.getRawValue(), //current value of text field
            value = me.value; //stored value from last selection or setValue() call

        if (me.getDisplayValue() !== rawValue) {
            value = rawValue;
            me.value = me.displayTplData = me.valueModels = null;
            if (picker) {
                me.ignoreSelection++;
                picker.getSelectionModel().deselectAll();
                me.ignoreSelection--;
            }
        }

        return me.value;	//只能取value值，不能取显示的文本值
    },

	/**
	 * 重写setValue
	 * @param {} value
	 * @param {} doSelect
	 * @return {}
	 */
    setValue: function(value, doSelect) {
    	//alert('ok');
        var me = this,
            valueNotFoundText = me.valueNotFoundText,
            inputEl = me.inputEl,
            i, len, record,
            dataObj,
            matchedRecords = [],
            displayTplData = [],
            processedValue = [];

        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
            me.value = value;
            me.setHiddenValue(me.value);
            return me;
        }

        // This method processes multi-values, so ensure value is an array.
        value = Ext.Array.from(value);

        // Loop through values, matching each from the Store, and collecting matched records
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
            	record = me.tree.getStore().getNodeById(value);
				me.tree.getSelectionModel().select(record);
                //record = me.findRecordByValue(record);
            }
            // record found, select it.
            if (record) {
                matchedRecords.push(record);
                displayTplData.push(record.data);
                processedValue.push(record.get(me.valueField));
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            else {
                // If we are allowing insertion of values not represented in the Store, then push the value and
                // create a fake record data object to push as a display value for use by the displayTpl
                if (!me.forceSelection) {
                    processedValue.push(value[i]);
                    dataObj = {};
                    dataObj[me.displayField] = value[i];
                    displayTplData.push(dataObj);
                    // TODO: Add config to create new records on selection of a value that has no match in the Store
                }
                // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
                else if (Ext.isDefined(valueNotFoundText)) {
                    displayTplData.push(valueNotFoundText);
                }
            }
        }

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.setHiddenValue(processedValue);
        me.value = me.multiSelect ? processedValue : processedValue[0];
        if (!Ext.isDefined(me.value)) {
            me.value = null;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method
        me.lastSelection = me.valueModels = matchedRecords;

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data
        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        if (doSelect !== false) {
            me.syncSelection();
        }
        me.applyEmptyText();

        return me;
    },

	
	// 重写销毁函数
	onDestroy: function() {
		//console.log('onDestroy');
        this.bindStore(null);
        //-----    
        this.treeData = null;
        this.Tree = null;
        this.treePanel.destroy();
        this.treePanel = null;
        //-----
        this.callParent();
    }
});