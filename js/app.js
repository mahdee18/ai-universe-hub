const loadFeatures = async () => {
    const url = ('https://openapi.programming-hero.com/api/ai/tools')
    const res = await fetch(url);
    const data = await res.json()
    displayFeatures(data.data.tools)
}
const displayFeatures = (features) => {
    const featuresContainer = document.getElementById('features-container')
    // Show All
    const showAll = document.getElementById('show-all')
    if (features.length > 6) {
        features = features.slice(0, 6)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    features.forEach(feature => {
        const featureDiv = document.createElement('div')
        featureDiv.classList.add('col')
        featureDiv.innerHTML = `
        <div class="card h-100">
                    <img src="${feature.image}" class="card-img-top p-4" alt="...">
                    <div class="card-body">
                      <h3 class="card-title">Features</h3>
                    <p> 
                        <ol class="text-secondary">
                            <li>${feature.features[0] ? feature.features[0] : 'Data not found!!'}</li>
                            <li>${feature.features[1] ? feature.features[1] : 'Data not found!!'}</li>
                            <li>${feature.features[2] ? feature.features[2] : 'Data not found!!'}</li>
                        </ol>
                    </p> 
                    <hr>        
                    <div class="d-flex justify-content-between">
                    <div>
                        <h3>${feature.name}</h3>
                        <p class="text-secondary"><i class="fa-regular fa-calendar-days"></i> ${feature.published_in}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <button onclick="loadModal('')" class="btn btn-light rounded-3" data-bs-toggle="modal" data-bs-target="#featureDetailsModal"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                    </div>
                </div>
                    </div>
                  </div>
        `
        featuresContainer.appendChild(featureDiv)
    });
    // Loader Stop
    toggleSpinner(false)

}
const toggleSpinner = (isLoading) => {
    const loader = document.getElementById('spinner')
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }
}
document.getElementById('show-all-btn').addEventListener('click', function () {
    // Loader Start
    toggleSpinner(true)

    loadFeatures()
})

loadFeatures()

const loadModal = async()=>{
    const url = (`https://openapi.programming-hero.com/api/ai/tool/01`)
    const res = await fetch(url)
    const data = await res.json()
    displayModal(data.data)
}
const displayModal =(items)=>{
    for (let i = 1; i <= 10; i++) {
        loadModal(i);
    }
    
}

loadModal()