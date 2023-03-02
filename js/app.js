const loadFeatures = async () => {
    const url = ('https://openapi.programming-hero.com/api/ai/tools')
    const res = await fetch(url);
    const data = await res.json()
    displayFeatures(data)
}
const displayFeatures = (features)=>{
    console.log(features)
}
loadFeatures()