//白名单
import useUserStore from '@/store/user.js'

const whiteList = [
	'/',
	'/pages/index/index',
	'/pages/my/my',
	'/pages/index/login',
	'/pages/index/register',
	'/pages/index/wiki',
	'/pages/index/crop',
	'/pages/index/mqtt',
	"/pages/index/wx_login",
	'/pages/my/articles/articles',
	'/pages/my/articles/create',
	
	
]

// const authList=[
// 	'/pages/my/my',
// 	'/pages/my/articles/articles',
// 	'/pages/my/articles/create',
	
// ]

function hasPermission(url) {
	//判断是都需要授权
	
	if(authList.includes(url)){
		console.log("授权",url)
		const userStore=useUserStore();
		const token=userStore.userinfo.token;
		if(token!=null&&token.length>0){
			return true	
		}
		else{
			uni.reLaunch({
				url:"/pages/index/login",
			})
			return false	
		}
		
	}
	else{
		return true;
	}
	

}
export default async function() {
	const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];
	list.forEach(item => {
		uni.addInterceptor(item, {
			invoke(e) {
				// 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
				const url = e.url.split('?')[0]
				if(whiteList.includes(url)){
					console.log('url', url,e)
					// 判断当前窗口是白名单，如果是则不重定向路由
					// return hasPermission(url);
					return true;
				}
				else{
					uni.showToast({
						title: '用户没有权限...',
						duration: 2000,
						icon: 'none',
					})
					return false
					
					
				}
			},
			fail() {
				
				return false
			}
		})
	})
}