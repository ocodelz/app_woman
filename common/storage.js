const clearStorageList = (type) => {
	// clearStorageList('')
	uni.getStorage({
		key: 'xt_info',
		success: (res) => {
			let _arr = res.data;
			_arr.sort((a, b) => {
				return a.t_time < b.t_time ? 1 : -1;
			})
			// console.log(JSON.stringify(_arr));
			let arr = [],
				list = [];
			for (let item of _arr) {
				if (item.type == type) {
					arr.push(item)
				} else {
					list.push(item)
				}
			}
			arr.splice(0, 1);
			// console.log(JSON.stringify(arr));
			let setArr = [];
			for (let item of arr) {
				setArr.push(item)
			}
			for (let item of list) {
				setArr.push(item)
			}
			// console.log(JSON.stringify(setArr));
			uni.setStorage({
				key: 'xt_info',
				data: setArr
			})
		}
	})
}
const setStorageList = (_arr) => {
	uni.getStorage({
		key: 'xt_info',
		success: (res) => {
			let arr = res.data;
			let setArr = [];
			for (let item of arr) {
				setArr.push(item)
			}
			for (let item of _arr) {
				setArr.push(item)
			}
			// console.log('1----'+JSON.stringify(_arr)); 
			// console.log('2----'+JSON.stringify(arr));
			// console.log('3----'+JSON.stringify(setArr));
			setArr.sort((a, b) => {
				return a.t_time < b.t_time ? 1 : -1;
			})
			uni.setStorage({
				key: 'xt_info',
				data: setArr
			})
		},
		fail: () => {
			uni.setStorage({
				key: 'xt_info',
				data: _arr
			})
		}
	})
}
export {
	clearStorageList,
	setStorageList
}
