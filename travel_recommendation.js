
const btnSearch = document.getElementById('btnSearch');
const btnclear = document.getElementById('btnclear');

function resetForm() {
    document.getElementById("destinationInput").value = "";
    document.getElementById("result").innerHTML = "";
}
btnclear.addEventListener("click", resetForm);

function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
        

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        debugger;
        if("beaches".indexOf(input.toLowerCase()) !== -1){
            var searchType = data.beaches;
        } else if ("temples".indexOf(input.toLowerCase()) !== -1) {
            var searchType = data.temples;
        }
        
        const countrySearch = data.countries.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));

        const citySearch = [];
        data.countries.forEach(element => {
            element.cities.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
            .forEach(e => {
                citySearch.push(e);
            });
            
        });
        
        if (searchType && searchType.length>0) {
            searchType.forEach(element => {
                resultDiv.innerHTML += `<div class="card-holder-2"><img src="${element.imageUrl}" alt="hjh"><h2>${element.name}</h2><p><strong>${element.description}</strong> </p><button id="visit">Visit</button></div>`;
                
            });
        } else if(countrySearch && countrySearch.length>0){
            countrySearch.forEach(element => element.cities.forEach(item => {
                resultDiv.innerHTML += `<div class="card-holder-2"><img src="${item.imageUrl}" alt="hjh"><h2>${item.name}</h2><p><strong>${item.description}</strong> </p><button id="visit">Visit</button></div>`;
                
            }));
        } else if(citySearch && citySearch.length>0){
            citySearch.forEach(element => {
                resultDiv.innerHTML += `<div class="card-holder-2"><img src="${element.imageUrl}" alt="hjh"><h2>${element.name}</h2><p><strong>${element.description}</strong> </p><button id="visit">Visit</button></div>`;
            });
        }
		 else {
          resultDiv.innerHTML = 'Destination not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
btnSearch.addEventListener('click', searchDestination);