
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
        
        const countrySearch = data.countries.filter(item => item.name.toLowerCase().includes(input));
        const citySearch = data.countries.map(element => element.cities).filter(item => item.name.toLowerCase().includes(input))

        if (searchType) {
            searchType.forEach(element => {
                resultDiv.innerHTML += `<img src="${element.imageUrl}" alt="hjh">`;
                resultDiv.innerHTML += `<h2>${element.name}</h2>`;
                resultDiv.innerHTML += `<p><strong>${element.description}</strong> </p>`;
            });

        } else if(countrySearch){
            countrySearch.map(element => element.cities).forEach(element => {
                resultDiv.innerHTML += `<img src="${element.imageUrl}" alt="hjh">`;
                resultDiv.innerHTML += `<h2>${element.name}</h2>`;
                resultDiv.innerHTML += `<p><strong>${element.description}</strong> </p>`;
            });
        }  else {
          resultDiv.innerHTML = 'Destination not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
btnSearch.addEventListener('click', searchDestination);