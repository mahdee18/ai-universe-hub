const loadFeatures = async (dataLimit) => {
    const url = ('https://openapi.programming-hero.com/api/ai/tools')
    const res = await fetch(url);
    const data = await res.json()
    displayFeatures(data.data.tools,dataLimit)
}
const displayFeatures = (features,dataLimit) => {
    const featuresContainer = document.getElementById('features-container')
    const showAll = document.getElementById('show-all');
        if (features.length > dataLimit) {
            features = features.slice(0, dataLimit);
            showAll.classList.remove("d-none");
        } else {
            showAll.classList.add("d-none");
        }

    featuresContainer.innerHTML=''
    
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
                        <button onclick="loadModal('${feature.id}')" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#featureDetailsModal"><i class="fa-solid fa-arrow-right"></i></button>
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
document.getElementById('show-all-btn').addEventListener('click', function (dataLimit) {
    const featuresContainer = document.getElementById('features-container')
    // Loader Start
    toggleSpinner(true)
    

    loadFeatures(featuresContainer)
})

loadFeatures(6)

const loadModal = async (id) => {
    const url = (`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const res = await fetch(url)
    const data = await res.json()
    displayModal(data.data)
}
const displayModal = (items) => {
    console.log(items.input_output_examples[0].input)
    const modalContainer = document.getElementById('featureDetails')
    modalContainer.textContent = '';
    modalContainer.innerHTML = `
    <div class="col">
    <div class="card p-3">
        <h5>${items.description}</h5>
        <div class="d-flex justify-content-between rounded center">
            <div class="text-success p-2 bg-light rounded-3">
            <h6>${items.pricing[0].price !=0 ? items.pricing[0].price : "Free of Cost"}</h6>
            <h6>${items.pricing[0].plan? items.pricing[0].plan : "No Data Found"}</h6>
            </div>
            <div class="text-warning p-2 bg-light rounded-3 m-2">
            <h6>${items.pricing[1].price !=1 ? items.pricing[1].price : "Free of Cost"}</h6>
            <h6>${items.pricing[1].plan? items.pricing[1].plan : "No Data Found"}</h6>
            </div>
            <div class="text-danger p-2 bg-light rounded-3">
            <h6>${items.pricing[2].price !=2 ? items.pricing[2].price : "Free of Cost"}</h6>
            <h6>${items.pricing[2].plan? items.pricing[2].plan : "No Data Found"}</h6>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div>
                <h4>Features</h4>
                <ul>
                    <li>${items.features[1].feature_name}</li>
                    <li>${items.features[2].feature_name}</li>
                    <li>${items.features[3].feature_name}</li>
                </ul>
            </div>
            <div>
                <h4>Integrations</h4>
                <ul>
                        <li>${items.integrations[0]? items.integrations[0] : "No Data Found"}</li>
                        <li>${items.integrations[1]? items.integrations[1] : "No Data Found"}</li>
                        <li>${items.integrations[2]?items.integrations[2] : "No Data Found"}</li>
                </ul>
            </div>
        </div>
        
    </div>

</div>
<div class="col">
<div class="card h-100">
<div>

    <img src="${items.image_link[0]}" class="card-img-top img-fluid" alt="">
    <span class="accuracy"><button class="btn btn-danger"><span>${items.accuracy.score}%</span> accuracy</button></span>
</div>
<div class="card-body">
  <h5 class="card-title p-3">${items.input_output_examples[0].input}</h5>
  <p class="card-text">${items.input_output_examples[0].output ? items.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
</div>
</div>
</div>
    `
    modalContainer.appendChild(modalSmallDiv)
}


