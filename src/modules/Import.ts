export default function (files: FileList, callback: Function){
	if (files.length <= 0) return false

	const fileReader = new FileReader()
	fileReader.readAsText(files.item(0))

	fileReader.onload = (event: any) => {
		const result = JSON.parse(event.target.result)
		// const formatted = JSON.stringify(result, null, 2)
		// console.log(result, event.target.result)
		callback(result)
	}
}