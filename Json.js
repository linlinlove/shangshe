/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		name: 'Leo yo',
		portrait: '/static/missing-face.png'
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = []
/* 商品列表 */
const goodsList = [{
		image: "https://img2.baidu.com/it/u=644499569,3147000851&fm=253&fmt=auto&app=138&f=JPEG?w=649&h=439",
		image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		image3: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		title: "南门宜家二期种植基地",
		price: 179,
		sales: 61,
		status:"等货"
	}, {
		image: "https://img1.baidu.com/it/u=2606248632,972884879&fm=253&fmt=auto&app=138&f=JPEG?w=510&h=340",
		image2: "http://img.ef43.com.cn/product/2021/3/291031299edsmall.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "南门宜家种植基地",
		price: 422,
		sales: 137,
		status:"现货"
	}, {
		image: "https://n.sinaimg.cn/front/232/w640h392/20190129/ch8r-hshmsth7964851.jpg",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "成都高新区种植基地",
		price: 179,
		sales: 95,
		status:"超时"
	},{
		image: "https://img1.baidu.com/it/u=1353933101,702518131&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=400",
		image2: "http://img.ef43.com.cn/product/2021/3/291031299edsmall.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "公园种植基地",
		price: 422,
		sales: 137,
		status:"交货"
	}, {
		image: "https://img2.baidu.com/it/u=1914821068,1745165881&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "高合种植基地",
		price: 179,
		sales: 95,
		status:"现货"
	},
]
/* 会员列表 */
const plusList = []
/* 购物车 */
const cartList = [];
//详情展示页面
const detailData = {
	title: '纯种金毛幼犬活体有血统证书',
	title2: '拆家小能手 你值得拥有',
	favorite: true,
	imgList: [{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
		},
		{
			src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
		},
	],
	episodeList: [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	],
	guessList: [{
			src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
			title: '猫眼指甲油',
			title2: '独树一帜的免照灯猫眼指甲'
		},
		{
			src: 'http://m.china-7.net/uploads/14778449362891.jpg',
			title: '创意屋',
			title2: '创意屋形上下双层高低床'
		},
		{
			src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
			title: 'MissCandy 指甲油',
			title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
			title: 'RMK 2017星空海蓝唇釉',
			title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。'
		}
	],
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = []
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '成都锦城公园充电站',
			price: 179.5,
			image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
			number: 1,
			attr: '#01号桩B枪'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
			title: '古黛妃 短袖t恤女 春夏装2019新款韩版宽松',
			price: 179.5,
			image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
			number: 1,
			attr: '珊瑚粉 M'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
			title: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
			price: 69,
			image: 'https://img.alicdn.com/imgextra/i3/2128794607/TB2gzzoc41YBuNjy1zcXXbNcXXa_!!2128794607.jpg_430x430q90.jpg',
			number: 1,
			attr: '白色-高帮 39'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg',
			},
			{
				image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg',
			},
		]
	}

]
const cateList = [{
		id: 1,
		name: '功能'
	},
	{
		id: 2,
		name: '礼品鲜花'
	},
	{
		id: 3,
		name: '男装女装'
	},
	{
		id: 4,
		name: '母婴用品'
	},
	{
		id: 5,
		pid: 1,
		name: '手机通讯'
	},
	{
		id: 6,
		pid: 1,
		name: '运营商'
	},
	{
		id: 8,
		pid: 5,
		name: '全面屏手机',
		picture: '/static/temp/cate2.jpg'
	},
	{
		id: 9,
		pid: 5,
		name: '游戏手机',
		picture: '/static/temp/cate3.jpg'
	},
	{
		id: 10,
		pid: 5,
		name: '老人机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 11,
		pid: 5,
		name: '拍照手机',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 12,
		pid: 5,
		name: '女性手机',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 14,
		pid: 6,
		name: '合约机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 15,
		pid: 6,
		name: '选好卡',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 16,
		pid: 6,
		name: '办套餐',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 17,
		pid: 2,
		name: '礼品',
	},
	{
		id: 18,
		pid: 2,
		name: '鲜花',
	},
	{
		id: 19,
		pid: 17,
		name: '公益摆件',
		picture: '/static/temp/cate7.jpg'
	},
	{
		id: 20,
		pid: 17,
		name: '创意礼品',
		picture: '/static/temp/cate8.jpg'
	},
	{
		id: 21,
		pid: 18,
		name: '鲜花',
		picture: '/static/temp/cate9.jpg'
	},
	{
		id: 22,
		pid: 18,
		name: '每周一花',
		picture: '/static/temp/cate10.jpg'
	},
	{
		id: 23,
		pid: 18,
		name: '卡通花束',
		picture: '/static/temp/cate11.jpg'
	},
	{
		id: 24,
		pid: 18,
		name: '永生花',
		picture: '/static/temp/cate12.jpg'
	},
	{
		id: 25,
		pid: 3,
		name: '男装'
	},
	{
		id: 26,
		pid: 3,
		name: '女装'
	},
	{
		id: 27,
		pid: 25,
		name: '男士T恤',
		picture: '/static/temp/cate13.jpg'
	},
	{
		id: 28,
		pid: 25,
		name: '男士外套',
		picture: '/static/temp/cate14.jpg'
	},
	{
		id: 29,
		pid: 26,
		name: '裙装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 30,
		pid: 26,
		name: 'T恤',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 31,
		pid: 26,
		name: '上装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 32,
		pid: 26,
		name: '下装',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 33,
		pid: 4,
		name: '奶粉',
	},
	{
		id: 34,
		pid: 4,
		name: '营养辅食',
	},
	{
		id: 35,
		pid: 4,
		name: '童装',
	},
	{
		id: 39,
		pid: 4,
		name: '喂养用品',
	},
	{
		id: 36,
		pid: 33,
		name: '有机奶粉',
		picture: '/static/temp/cate17.jpg'
	},
	{
		id: 37,
		pid: 34,
		name: '果泥/果汁',
		picture: '/static/temp/cate18.jpg'
	},
	{
		id: 39,
		pid: 34,
		name: '面条/粥',
		picture: '/static/temp/cate20.jpg'
	},
	{
		id: 42,
		pid: 35,
		name: '婴童衣橱',
		picture: '/static/temp/cate19.jpg'
	},
	{
		id: 43,
		pid: 39,
		name: '吸奶器',
		picture: '/static/temp/cate21.jpg'
	},
	{
		id: 44,
		pid: 39,
		name: '儿童餐具',
		picture: '/static/temp/cate22.jpg'
	},
	{
		id: 45,
		pid: 39,
		name: '牙胶安抚',
		picture: '/static/temp/cate23.jpg'
	},
	{
		id: 46,
		pid: 39,
		name: '围兜',
		picture: '/static/temp/cate24.jpg'
	},
]
const cityList = [	 
	 {
	     "letter":"A",
	     "data":[
	 		"阿坝","阿拉善","阿里","安康","安庆","鞍山","安顺","安阳","澳门"
	 	    ]
	 },
	 {
	     "letter":"B",
	     "data":["北京","白银","保定","宝鸡","保山","包头","巴中","北海","蚌埠","本溪","毕节","滨州","百色","亳州"
	 	    ]
	 },
	 {
	     "letter":"C",
	     "data":["重庆","成都","长沙","长春","沧州","常德","昌都","长治","常州","巢湖","潮州","承德", "郴州","赤峰","池州","崇左","楚雄","滁州","朝阳"
	 	    ]
	 },
	 {
	     "letter":"D",
	     "data":["大连","东莞","大理","丹东","大庆","大同","大兴安岭","德宏","德阳","德州","定西","迪庆","东营"
	 	    ]
	 },
	 {
	     "letter":"E",
	     "data":["鄂尔多斯","恩施","鄂州"]
	 },
	 {
	     "letter":"F",
	     "data":["福州","防城港","佛山","抚顺","抚州","阜新","阜阳"
	 	    ]
	 		
	 },
	 {
	    "letter":"G",
	     "data":["广州","桂林","贵阳","甘南","赣州","甘孜","广安","广元","贵港","果洛"]
			
	 },
	 {
	    "letter":"H",
	     "data":["杭州","哈尔滨","合肥","海口","呼和浩特","海北","海东","海南","海西","邯郸","汉中","鹤壁","河池","鹤岗","黑河","衡水","衡阳","河源","贺州","红河","淮安","淮北","怀化","淮南","黄冈","黄南","黄山","黄石","惠州","葫芦岛","呼伦贝尔","湖州","菏泽"
		    ]
	 },
	 {
	    "letter":"J",
	     "data":["济南","佳木斯","吉安","江门","焦作","嘉兴","嘉峪关","揭阳","吉林","金昌","晋城","景德镇","荆门","荆州","金华","济宁","晋中","锦州","九江",
            "酒泉"
                    ]
            
	 },
	 {
	    "letter":"K",
	     "data":["昆明","开封"]
 
	 },
	 {
	    "letter":"L",
	     "data":["兰州","拉萨","来宾","莱芜","廊坊","乐山","凉山","连云港","聊城","辽阳","辽源","丽江","临沧","临汾","临夏","临沂","林芝","丽水","六安","六盘水",
            "柳州","陇南","龙岩","娄底","漯河","洛阳","泸州","吕梁"
                    ]
 
	 },
	 {
 	    "letter":"M",
	     "data":["马鞍山","茂名","眉山","梅州","绵阳","牡丹江"]
 			
	 },
	 {
	    "letter":"N",
	     "data":["南京","南昌","南宁","宁波","南充","南平","南通","南阳","那曲","内江", "宁德","怒江"
                     ]
	 },
	 {
	    "letter":"P",
	     "data":["盘锦","攀枝花","平顶山","平凉","萍乡","莆田","濮阳"]
 
	 },
	 {
	    "letter":"Q",
	     "data":["青岛","黔东南","黔南","黔西南","庆阳","清远","秦皇岛","钦州","齐齐哈尔","泉州","曲靖","衢州"]
			
	 },
	 {
	    "letter":"R",
	     "data":["日喀则","日照"]
	 },
	 {
	    "letter":"S",
	     "data":["上海","深圳","苏州","沈阳","石家庄","三门峡","三明","三亚","商洛","商丘","上饶","山南","汕头","汕尾","韶关","绍兴","邵阳","十堰","朔州","四平","绥化","遂宁","随州","宿迁","宿州"
		    ]
            
	 },
	 {
	    "letter":"T",
	     "data":["天津","太原","泰安","泰州","台州","唐山","天水","铁岭","铜川","通化","通辽","铜陵","铜仁","台湾"
		    ]
	 },
         {
	    "letter":"W",
	     "data":["武汉","乌鲁木齐","无锡","威海","潍坊","文山","温州","乌海","芜湖","乌兰察布","武威","梧州"
		    ]
	 },
	 {
	    "letter":"X",
	     "data":["厦门","西安","西宁","襄樊","湘潭","湘西","咸宁","咸阳","孝感","邢台","新乡","信阳","新余","忻州","西双版纳","宣城","许昌","徐州","香港","锡林郭勒","兴安"
		    ]
            
	 },
	 {
	    "letter":"Y",
	     "data":["银川","雅安","延安","延边","盐城","阳江","阳泉","扬州","烟台","宜宾","宜昌","宜春","营口","益阳","永州","岳阳","榆林","运城","云浮","玉树","玉溪","玉林","鹰潭"
		    ]
			
	 },
	 {
	     "letter":"Z",
	     "data":["杂多县","赞皇县","枣强县","枣阳市","枣庄","泽库县","增城市","曾都区","泽普县","泽州县","札达县","扎赉特旗","扎兰屯市","扎鲁特旗","扎囊县","张北县","张店区","章贡区","张家港","张家界","张家口","漳平市","漳浦县","章丘市","樟树市","张湾区","彰武县","漳县","张掖","漳州","长子县","湛河区","湛江","站前区","沾益县","诏安县","召陵区","昭平县","肇庆","昭通","赵县","昭阳区","招远市","肇源县","肇州县","柞水县","柘城县","浙江","镇安县","振安区","镇巴县","正安县","正定县","正定新区","正蓝旗","正宁县","蒸湘区","正镶白旗","正阳县","郑州","镇海区","镇江","浈江区","镇康县","镇赉县","镇平县","振兴区","镇雄县","镇原县","志丹县","治多县","芝罘区","枝江市","芷江侗族自治县","织金县","中方县","中江县","钟楼区","中牟县","中宁县","中山","中山区","钟山区","钟山县","中卫","钟祥市","中阳县","中原区","周村区","周口","周宁县","舟曲县","舟山","周至县","庄河市","诸城市","珠海","珠晖区","诸暨市","驻马店","准格尔旗","涿鹿县","卓尼","涿州市","卓资县","珠山区","竹山县","竹溪县","株洲","株洲县","淄博","子长县","淄川区","自贡","秭归县","紫金县","自流井区","资溪县","资兴市","资阳"
		    ]
	 }
    ]
//充电仪表盘数据
const GaugeData = {
		"Gauge": {
				"categories": [{
					"value": 0.2,
					"color": "#f04864"
				}, {
					"value": 0.8,
					"color": "#1890ff"
				}, {
					"value": 1,
					"color": "#2fc25b"
				}],
				"series": [{
					"name": "电量百分比",
					"data": 0.43
				}]
			},
	}
//充电站数据
const stationData = [
	{"id":0,"latitude": 30.573095,"longitude": 104.066143,"iconPath": '/static/location.png'},
	{"id":1,"latitude": 30.523095,"longitude": 104.266143,"iconPath": '/static/location.png',},
	{"id":2,"latitude": 30.533095,"longitude": 104.366143,"iconPath": '/static/location.png',},
	{"id":3,"latitude": 30.543095,"longitude": 104.016143,"iconPath": '/static/location.png',},
	{"id":4,"latitude": 30.553095,"longitude": 104.026143,"iconPath": '/static/location.png',},
	{"id":5,"latitude": 30.563095,"longitude": 104.036143,"iconPath": '/static/location.png',},
	{"id":6,"latitude": 30.373095,"longitude": 104.046143,"iconPath": '/static/location.png',},
	{"id":7,"latitude": 30.473095,"longitude": 104.056143,"iconPath": '/static/location.png',},
	{"id":8,"latitude": 30.573095,"longitude": 104.061143,"iconPath": '/static/location.png',},
	{"id":9,"latitude": 30.673095,"longitude": 104.062143,"iconPath": '/static/location.png',},
	{"id":10,"latitude": 30.173095,"longitude": 104.063143,"iconPath": '/static/location.png',}
]
const timePrice = [
          {id:"1",time:"00:00-00:30",sign:"3"},{id:"2",time:"00:30-01:00",sign:"3"},
          {id:"3",time:"01:00-01:30",sign:"3"},{id:"4",time:"01:30-02:00",sign:"3"},
          {id:"5",time:"02:00-02:30",sign:"3"},{id:"6",time:"02:30-03:00",sign:"3"},
          {id:"7",time:"03:00-03:30",sign:"3"},{id:"8",time:"03:30-04:00",sign:"3"},
          {id:"9",time:"04:00-04:30",sign:"3"},{id:"10",time:"04:30-05:00",sign:"3"},
          {id:"11",time:"05:00-05:30",sign:"3"},{id:"12",time:"05:30-06:00",sign:"3"},
          {id:"13",time:"06:00-06:30",sign:"3"},{id:"14",time:"06:30-07:00",sign:"3"},
          {id:"15",time:"07:00-07:30",sign:"2"},{id:"16",time:"07:30-08:00",sign:"2"},
          {id:"15",time:"08:00-08:30",sign:"2"},{id:"16",time:"08:30-09:00",sign:"2"},
          {id:"15",time:"09:00-09:30",sign:"2"},{id:"16",time:"09:30-10:00",sign:"2"},
          {id:"15",time:"10:00-10:30",sign:"2"},{id:"16",time:"10:30-11:00",sign:"2"},
          {id:"15",time:"11:00-11:30",sign:"4"},{id:"16",time:"11:30-12:00",sign:"4"},
          {id:"15",time:"12:00-12:30",sign:"4"},{id:"16",time:"12:30-13:00",sign:"4"},
          {id:"15",time:"13:00-13:30",sign:"4"},{id:"16",time:"13:30-14:00",sign:"4"},
          {id:"15",time:"14:00-14:30",sign:"4"},{id:"16",time:"14:30-15:00",sign:"4"},
          {id:"15",time:"15:00-15:30",sign:"4"},{id:"16",time:"15:30-16:00",sign:"4"},
          {id:"15",time:"16:00-16:30",sign:"4"},{id:"16",time:"16:30-17:00",sign:"4"},
          {id:"15",time:"17:00-17:30",sign:"4"},{id:"16",time:"17:30-18:00",sign:"4"},
          {id:"15",time:"18:00-18:30",sign:"4"},{id:"16",time:"18:30-19:00",sign:"4"},
          {id:"15",time:"19:00-19:30",sign:"1"},{id:"16",time:"19:30-20:00",sign:"1"},
          {id:"15",time:"20:00-20:30",sign:"1"},{id:"16",time:"20:30-21:00",sign:"1"},
          {id:"15",time:"21:00-21:30",sign:"1"},{id:"16",time:"21:30-22:00",sign:"1"},
          {id:"15",time:"22:00-22:30",sign:"1"},{id:"16",time:"22:30-23:00",sign:"1"},
          {id:"15",time:"23:00-23:30",sign:"3"},{id:"16",time:"23:30-00:00",sign:"3"},
        ]
export default {
	carouselList,
	cartList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	plusList,
	orderList,
	cateList,
	cityList,
	GaugeData,
	stationData,
	timePrice
}
