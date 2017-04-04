/**
 * 报表下载按钮.
 * 统一处理报表下载请求逻辑
 * 只能用在grid中
 * @author LJY
 * @since 2013.9.4
 */
Ext.define('Admin.view.saleManage.Kehu',{
	 extend: 'Admin.view.BasePage',
	 xtype: 'kehu',
	// alias : 'widget.bangche',
	 title : '客户管理',
     //border : false,
     closable: true,
     layout:'border',
	 height:800,
	 // layout: {
        // type: 'vbox',
        // align: 'stretch'
    // },

    margin: '20 0 0 20',
     initComponent:function(){
     var logMgrStore = null;//Ext.create('Admin.store.saleManage.BangcheStore');
    	 this.items=[{
    		xtype : 'searchForm',
 			region : 'north',
 			frame : true,
 			defaults:{
		            		fieldDefaults:{
		            			labelAlign:'right',
		            			labelWidth:60
		            		}
		    },
 			items:[{
 				xtype:'fieldcontainer',
		            		layout:{
		            			type:'table',
		            			columns:3
 						},
 				defaultType : 'textfield', 
 				items:[{
 					xtype : 'textfield',
 					fieldLabel:'SIM卡号',
 					name:'mobile',
 					itemId:'mobile',
 					width:250,
 					labelWidth : 60	  	
 				},{
 					xtype : 'textfield',
 					fieldLabel:'车牌号',
 					name:'certId',
 					itemId:'certId',
 					width:250,
 					labelWidth : 60	 
 			    },{
 					  xtype:'textfield',
 					  fieldLabel:'用户ID',
 					  allowBlank:true,
 					  labelWidth:60,
 					  width:250,
 					  name:'operid'
 				  },{
 					xtype : 'datefield',
				    fieldLabel : '开始日期',
				    value:new Date(),
				    allowBlank:false,
				    name : 'startDate',
				    format : 'Y-m-d',
				    labelWidth:60,
					width : 250
				},{
 					xtype : 'datefield',
		    		fieldLabel : '结束日期',
		    		value:new Date(),
		    		allowBlank:false,
		    		name : 'endDate',
		    		format : 'Y-m-d',
		    		labelWidth:60,
					width : 250
 				  },{
 					  xtype:'textfield',
 					  fieldLabel:'操作事件',
 					  allowBlank:true,
 					  labelWidth:60,
 					  width:250,
 					  name:'operevent'
 				  },{
		   	        	xtype : 'combobox',
						fieldLabel : '所属系统',
						labelWidth:60,
						width : 250,
						name : 'sysId',
						store : Ext.create('Ext.data.Store',{
							fields: ['sysId' , 'sysName'],
							
						}),
						//store : Admin.app.getDictSubSysInfoStore(),
						valueField: 'sysId',
			            displayField: 'sysName',
			            queryMode: 'local',
						editable : false
		   	        }]
 			    }]
    	        },{
    	        	xtype:'grid',
    	  			region : 'center',
    	 	  		frame:true,
    	 	  		itemId:'logGrid',
    	 	  		autoScroll : true,
    	 	  		store : logMgrStore,
    	 	  		//bodyPadding : 5,
    	 	  			
    	 	  		viewConfig:{
    	 	  			loadMask:true
    	 	  		},
    	 	  		columns:[{
    	 	  			text:'用户ID',
    	 	  			dataIndex:'operid',
    	 	  			width:120,
    	 	  		},{
    	 	  			text:'操作时间',
    	 	  			dataIndex:'opertime',
    	 	  			width:150
    	 	  		},{
    	 	  			text:'终端SIM卡号',
    	 	  			dataIndex:'mobile',
    	 	  			width:120
    	 	  		},{
    	 	  			text:'车牌号',
    	 	  			dataIndex:'certid',
    	 	  			width:70
    	 	  		},{
    	 	  			text:'登录IP地址',
    	 	  			dataIndex:'operip',
    	 	  			width:130
    	 	  		},{
    	 	  			text:'操作事件',
    	 	  			dataIndex:'operevent',
    	 	  			width:120
    	 	  		},{
    	 	  			text:'操作说明',
    	 	  			dataIndex:'opercont',
    	 	  			width:120
    	 	  		}],
    	 	  		dockedItems :[{
		            	       xtype: 'toolbar',
		            	       dock: 'top',
		            	       items: [
		            	               {text:'添加',tooltip:'添加一个部门',iconCls:'x-fa fa-plus',itemId:'add',hidden : !Admin.app.checkRight(127, 1)},
		            	               {text:'修改',tooltip:'修改选中部门',disabled:true,iconCls:'x-fa fa-edit',itemId:'update',hidden : !Admin.app.checkRight(127, 2)},
		            	               {text:'删除',tooltip:'删除选中部门',disabled:true,iconCls:'x-fa fa-minus',itemId:'del',hidden : !Admin.app.checkRight(127, 3)}
		            	              
		            	               
		            	               ]
		            	     },{
    	            	xtype : 'pagingtoolbar',
    	            	store : logMgrStore,
    					dock : 'bottom',
    					displayMsg : '第{0}条到{1}条,一共{2}条',
    					emptyMsg : '没有记录',
    					displayInfo : true,
    					prevText : "上一页",
    					nextText : "下一页",
    					lastText : "最后页",
    					firstText : "第一页",
    					beforePageText : "当前页",
    	        		items:[{
   					    	   xtype:'tbspacer',
   					    	   width:20
   					       },{
   					    	   xtype:'downloadButton',
   					    	   tooltip:'导出日志管理报表到Excel表中',
   					    	   excelConfig:{
       	    						xtype:'excelConfig',
       	    						title:'日志管理',
       	    						columnNames:[
       	    						             {name:'所属业户',key:'groupId',width:35,align:'left'},
       	    						             {name:'用户ID', key:'operid', width:20, align:'left'},
       	    						             {name:'操作时间', key:'opertime', width:20, align:'left'},
       	    						             {name:'终端SIM卡号', key:'mobile', width:15, align:'left'},
       	    						             {name:'车牌号', key:'certid', width:15, align:'left'},
       	    						             {name:'登录IP地址', key:'operip', width:15, align:'left'},
       	    						             {name:'操作事件', key:'operevent', width:15, align:'left'},
       	    						             {name:'操作说明', key:'opercont', width:50, align:'left'}
       	    						            ]  
   					    	   				  }
   					    	   		
   					       }]
    	        	}],
    	        	listeners: {
    	        		afterrender:function( grid, eOpts ){
    	        		  
    	        		},
    	        		selectionchange:function( grid, selected, eOpts ){
    	        			var btn = Ext.ComponentQuery.query("button[itemId=button01]")[0];
    	        			if(selected){
    	        				btn.setDisabled(false);
    	        			}else{
    	        				btn.setDisabled(true);
    	        			}
    	        		},
    	        		render: function(view){
    	        			view.tip = Ext.create('Ext.tip.ToolTip', {
    	        	            target: view.el,
    	        	            delegate: '.x-grid-cell-inner',
    	        	            trackMouse: true,
    	        	            renderTo: Ext.getBody(),
    	        	            listeners: {
    	        	                beforeshow: function updateTipBody(tip) {
    	        	                    tip.update("双击查看详情");
    	        	                }
    	        	            }
    	        	        });
    	        		},
    	        		itemdblclick:function(view, record, item, index, e, eOpts ){
    	        			 var win = Ext.ComponentQuery.query("window[itemId=logWin]")[0];
					    		   if(!win){
					    			   win = Ext.create('Ext.window.Window', {
	   					    		    title: '详情',
	   					    		    height: 335,
   	   					    		    width: 525,
	   					    		    itemId :"logWin",
	   					    		    layout: 'fit',
	   					    		    items: {  
	   					    		        xtype: 'form',
	   					    		        border: false,
	   					    		        layout:{
	   					    		        	type:"table",
	   					    		        	columns:2
	   					    		        },
	   					    		        items:[{
	   						    	   		   xtype:'grouptreecombo',
	   						    	   		   fieldLabel:'所属业户',
	   						    	   		   labelAlign:'right',
	   						    	   		   labelWidth:60,
	   						    	   		   treeData: Admin.app.getGroupTreeRaw(),
	   						    	   		   valueField: 'id',
	   						    	   		   displayField: 'text',
	   						    	   		   queryMode: 'local',
	   						    	   		   emptyText:'请选择所属业户',
	   						    	   		   width:250,
	   						    	   		   margin:'15 0 0 0',
	   						    	   		   colspan:2,
	   						    	   		   name:'groupId'
	   					 				},{
	   					 					  xtype:'textfield',
	   					 					  fieldLabel:'操作事件',
	   					 					  allowBlank:true,
	   					 					  labelWidth:60,
	   					 					  width:250,
	   					 					  labelAlign:'right',
	   					 					  name:'operevent'
	   					 				  },{
	   					 					  xtype:'textfield',
	   					 					  fieldLabel:'用户ID',
	   					 					  allowBlank:true,
	   					 					  labelWidth:60,
	   					 					  width:250,
	   					 					  labelAlign:'right',
	   					 					  name:'operid'
	   					 				  },{
	         					 					xtype : 'textfield',
	           					 					fieldLabel:'SIM卡号',
	           					 					name:'mobile',
	           					 					itemId:'mobile',
	           					 					width:250,
	           					 					labelAlign:'right',
	           					 					labelWidth : 60	  	
	           					 				},{
	   					 					xtype : 'textfield',
	   					 					fieldLabel:'车牌号',
	   					 					name:'certid',
	   					 					itemId:'certId',
	   					 					width:250,
	   					 					labelAlign:'right',
	   					 					labelWidth : 60	 
	   					 			    },{
	 					 					xtype : 'textfield',
	   							    		fieldLabel : '操作时间',
	   							    		value:new Date(),
	   							    		allowBlank:false,
	   							    		name : 'opertime',
	   							    		labelWidth:60,
	   							    		labelAlign:'right',
	   										width : 250
	   					 				  },{
	   					 			    	xtype:'textfield',
	   					 			    	fieldLabel:"登陆IP",
	   					 			    	name:'operip',
	   					 			    	width:250,
	   					 			    	labelAlign:'right',
						 					labelWidth : 60	 
	   					 			    },{
	   					 					  xtype:'htmleditor',
	   					 					  xtype: 'htmleditor',
	   					 					  name:'opercont',
	   					 					  enableColors: false,
	   					 					  enableAlignments: false,
	   					 					  colspan:2,
	   					 					  width:500,
	   					 					  margin:'0 0 0 5' 
	   					 				  }]
	   					    		    }
	   					    		});
					    		   }
					    		   win.down("form").loadRecord(record); 
					    		   win.show();
    	        		}
    	        	 }
    	        	 
    	 }];
    	 this.callParent(arguments);
     }
	
});