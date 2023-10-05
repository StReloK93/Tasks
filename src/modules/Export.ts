export default function (jsonData) {
	const dataStr = JSON.stringify(jsonData)
	const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
	const exportFileDefaultName = `${jsonData.name}.json`

	const linkElement = document.createElement('a')
	linkElement.setAttribute('href', dataUri)
	linkElement.setAttribute('download', exportFileDefaultName)
	linkElement.click()
}