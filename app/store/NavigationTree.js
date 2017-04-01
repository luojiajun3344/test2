Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',
    fields: [{
        name: 'text'
    }],
    root: {
        expanded: true,
        children: [
            {
                text: '主页',
                iconCls: 'x-fa fa-desktop',
                rowCls: 'nav-tree-badge nav-tree-badge-new',
                viewType: 'admindashboard',
                routeId: 'dashboard', // routeId defaults to viewType
                leaf: true
            },
            {
                text: '基础信息管理',
                iconCls: 'x-fa fa-send',
                // rowCls: 'nav-tree-badge nav-tree-badge-hot',
             
				expanded: false,
                selectable: false,
                   children: [
                    {
                        text: '搅拌站管理',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'jiaobanche',
                        leaf: true
                    },
                    {
                        text: '泵车管理',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'bangche',
                        leaf: true
                    },
                    {
                        text: '车主管理',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'chezhu',
                        leaf: true
                    },
                    {
                        text: '驾驶员管理',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'jiashiyuan',
                        leaf: true
                    },
                    {
                        text: '生产线管理',
                        iconCls: 'x-fa fa-check',
                        viewType: 'shenchaxian',
                        leaf: true
                    }
                ]
            },
            {
                text: '销售管理',
                iconCls: 'x-fa fa-user',
               expanded: false,
                selectable: false,
                   children: [
                    {
                        text: '客户管理',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '工程管理',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '合同管理',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: '运输间距管理',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    }
                ]
            },
            {
                text: '生产管理',
                iconCls: 'x-fa fa-search',
                expanded: false,
                selectable: false,
                   children: [
				      {
                text: '基础数据管理',
                iconCls: 'x-fa fa-search',
                expanded: false,
                selectable: false,
				children: [
                    {
                        text: '施工部位',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '上料员',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '塌落度',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: '浇筑方式',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    } ,{
                        text: '水泥品种',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '方量比',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '外加剂',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: '抗渗等级',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    },{
                        text: '抗冻等级',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '抗折等级',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '冻融循环',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: '集料信息',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    }
                ]
					  }
				]
            },
            {
                text: '生产任务',
                iconCls: 'x-fa fa-question',
                 expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',
                children: [
                    {
                        text: ' 生产任务单',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '车辆调度信息',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '送货单管理',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: '退砼记录',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    }
                ]
            },{
                text: '配比管理',
                iconCls: 'x-fa fa-question',
                 expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',
                children: [
                    {
                        text: '理论配比库',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '施工配比库',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '生产任务关联配比',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    }
                ]
            },{
                text: '生产运营统计',
                iconCls: 'x-fa fa-question',
                 expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',
                children: [
                    {
                        text: '生产任务统计',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '生产日统计',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '送货单统计',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: '出车运距统计',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    }
                ]
            },{
              	text: '系统管理',
               iconCls: 'x-fa fa-lightbulb-o',
            	expanded: false,
                selectable: false,
            			children: [
	              		{
	              		    text:'角色管理',
	              	       viewType: 'systemadminRolePanel',
                           leaf: true
	              		},
	              		{
	              		    text:'日志管理',
							viewType: 'logManagement',
							leaf: true
	              		},
						{
	              		    text:'部门管理',
	              	     	 viewType: 'deptInfoManagerPanel',
							leaf: true
	              		},
	              		{
	              		    text:'人员管理',
	              	 		viewType: 'employeInfoManagerPanel',
							leaf: true
	              		}
              		]
	        },
			  {
                text: '页面',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,
                children: [
                    {
                        text: 'Blank Page',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '404 Error',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '500 Error',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: 'Lock Screen',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    },
                    {
                        text: 'Login',
                        iconCls: 'x-fa fa-check',
                        viewType: 'login',
                        leaf: true
                    },
                    {
                        text: 'Register',
                        iconCls: 'x-fa fa-pencil-square-o',
                        viewType: 'register',
                        leaf: true
                    },
                    {
                        text: 'Password Reset',
                        iconCls: 'x-fa fa-lightbulb-o',
                        viewType: 'passwordreset',
                        leaf: true
                    }
                ]
            },
            {
                text: '组件',
                iconCls: 'x-fa fa-flask',
				hide:true,
                viewType: 'widgets',
                leaf: true
            },
		
            {
                text: '表单',
                iconCls: 'x-fa fa-edit',
                viewType: 'forms',
                leaf: true
            },
            {
                text: '图表',
                iconCls: 'x-fa fa-pie-chart',
                viewType: 'charts',
                leaf: true
            },
			  {
                text: 'Email',
                iconCls: 'x-fa fa-send',
                rowCls: 'nav-tree-badge nav-tree-badge-hot',
                viewType: 'email',
                leaf: true
            },
        ]
    }
});