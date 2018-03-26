# association-search
调用AssociateSearch构造函数, ajaxSearch为主功能函数, 可回调, 回调函数一般用来请求后台数据
 注意: 必须将获取到的数据(demo中为json)传入back中
 后台数据格式:
var json = {
data: [
        {
                id: 1,
                title: '阿'
        },
        {
                id: 2,
                title: '阿里'
        },
        {
                id: 3,
                title: '阿里巴巴'
        }
]
}
