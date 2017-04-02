/********
 * 部门员工
 *********/
Ext.define('Admin.view.systemadmin.AddEmpInfoForm',{
	extend:'Admin.view.BaseWindow',
	title:'添加新员工',
	iconCls:'x-fa fa-plus',
	alias:'widget.addEmpInfoForm',
	width:300,
	height:180,
	items:[{
		xtype:'form',
		bodyPadding:5,
		layout:{
			type:'table',
			columns:1
		},
		items:[
		       {
		    	   xtype:'textfield',
		    	   fieldLabel:'员工代码',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   width:270,
		    	   disabled:true,
		    	   value:'系统自动生成',
		    	   readOnly:true,
		    	   //name:'deptId'
		       },{
		    	   xtype:'textfield',
		    	   fieldLabel:'员工姓名',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   allowBlank :false,
		    	   blankText :'员工姓名不能为空',
		    	   width:270,
		    	   maxLength :15,
		    	   maxLengthText :'部门名称最多50个字符',
		    	   name:'employeName'
		       },{
		    	   xtype:'textfield',
		    	   fieldLabel:'手机号码',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   allowBlank :false,
		    	   blankText :'手机号码不能为空',
		    	   width:270,
		    	   maxLength :15,
		    	   regex : /^[1]\d{10}$/,
		    	   regexText :'请输入正确的11位手机号码格式[1**********]',
		    	   maxLengthText :'部门名称最多50个字符',
		    	   name:'mobile'
		       },{
		    	   xtype:'deptComboboxTree',
		    	   fieldLabel:'所属部门',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   width:270,
		    	   url:'rest/systemadmin/deptInfo/selectAllDept',
		    	   displayField:'deptName',
       	    	   valueField:'deptId',
		    	   allowBlank :false,
		    	   blankText :'所属部门不能为空',
		    	   forceSelection :true,
		    	   maxLength :20,
		    	   maxLengthText :'所属部门最多20个字符',
		    	   name:'deptId',
		    	   listeners: {
				        change:function(value){
				        	if(this.getRawValue()!=''){
				        		Ext.getCmp('dept').setValue(this.getRawValue());
				        	}else{
				        		Ext.getCmp('dept').setValue('');
				        	}
				        	if(this.getValue()=='00'){
					        		//alert(this.getValue())
					        		this.setValue('');
					        }
				        }
				    }
		    	  
		       },{
		    	   //用于在添加时及时在grid中显示,因为数据库中并没有这个字段
		    	   xtype:'hidden',
		    	   fieldLabel:'部门名称',
		    	   labelAlign:'right',
		    	   labelWidth:60,
		    	   //allowBlank :false,
		    	  // blankText :'部门名称不能为空',
		    	   width:270,
		    	   maxLength :50,
		    	   maxLengthText :'部门名称最多50个字符',
		    	   id:'dept',
		    	   name:'deptName'
		       }]
	}],
	buttons: [
	          { text: '保存',handler:function(btn){
	        	  var win=btn.ownerCt.ownerCt;
	        	  var form=win.down('form');
	        	  var values=form.getValues();
	        	  var record=Ext.create('Admin.model.systemadmin.EmployeInfoModel');
	        	  record.set(values);
	        	  var grids = Ext.ComponentQuery.query('employeInfoManagerPanel grid');
	        	  var store=grids[0].getStore();
	        	  if(form.isValid()==false){
	        		  Ext.Msg.alert('提示','请填写必要的数据');
	        		  return;
	        	  }else{
	        		  store.add(record);
	        		  store.sync({
			    			 success:function(batch,options){
			    				 //Ext.Msg.alert('提示','添加成功!');
			    				 win.close();
			    			 },
			    			 failure:function(batch,options){
			    				 	store.rejectChanges();
			    			 }
			    		 });
	        		  }
	        	 
	        	  
	          }},
	          { text: '取消',handler:function(btn){
	        	var win=btn.ownerCt.ownerCt;
	        	win.close();
	          }}
	          
	        ],
	initComponent:function(){
		this.callParent(arguments);
	}
	
});