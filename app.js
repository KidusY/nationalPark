const apikey = 'MF0fI0KP0mloeLa1itOadJIx6K6rJZvS4h0eAMpU';
const searchUrl = "https://developer.nps.gov/api/v1/parks";

function getParkInfo(searchTerm, maxResults = '10', stateCode = 'CA') {
    if (maxResults == '') {
        maxResults = '10'
    }
    let params = {
        stateCode: stateCode,
        limit: maxResults,
        q: searchTerm,
        api_key: apikey,


    }

    const queryString = $.param(params);
    console.log(queryString);
    const url = `${searchUrl}?${queryString}`;

    fetch(url).then(resp => {
        if (resp.ok) {

            return resp.json();
        }

        throw new Error(resp.statusText);
    }).then(respJson => displayResults(respJson.data))

}

function displayResults(json) {

    $("#results-list").empty()

    for (const parks of json) {
        $('#results-list').append(`
            <li>
                <h3>${parks.fullName}</h3>
            <p>${parks.description}</p>
            <address>
                <a href="${parks.url}">${parks.url}</a>
            </address>
            
            </li>
        
        `)

    }
    console.log(json);

    $("#results").removeClass('hidden');

}



function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $("#search-term").val();
        const maxResults = $("#max-results").val()
        console.log(searchTerm, maxResults);
        getParkInfo(searchTerm, maxResults);
    })
}

$(watchForm);