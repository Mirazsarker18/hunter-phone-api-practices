const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
// step 1: id set
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent = ' ';

    // display show all buttons if there are more than 12 (conditions use)
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
console.log('show all clicked', isShowAll);

    // page show cards display only first 12 phones if not show all 
    if(!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        // console.log(phone);
        // step 2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        // step 3: set inner html
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button onclick="handleShowDetail('${phone.slug
        }')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        
        `;

        // step 4 : Append child
        phoneContainer.appendChild(phoneCard);

    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

    // show details modal function
const handleShowDetail = async (id) => {
    // const handleShowDetailModal = document.getElementById();
    console.log('Click show detail', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

// show modal 
const showPhoneDetails = (phone) => {
    console.log(phone);
    // const phoneName = document.getElementById('show-detail-phone-name');
    // phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" class="ml-32 sm:ml-36 md:ml-40 lg:ml-40">
    <h3 class="font-bold text-lg text-slate-900 mt-4">${phone.name}</h3>
    <p class="my-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="my-2"> <span class="font-bold">Storage: </span> ${phone?.mainFeatures?.storage} </p>
    <p class="my-2"> <span class="font-bold">Display Size: </span> ${phone?.mainFeatures?.displaySize} </p>
    <p class="my-2"> <span class="font-bold">Chipset: </span> ${phone?.mainFeatures?.chipSet} </p>
    <p class="my-2"> <span class="font-bold">Memory: </span> ${phone?.mainFeatures?.memory} </p>
    <p class="my-2"> <span class="font-bold">Slug: </span> ${phone.slug} </p>
    <p class="my-2"> <span class="font-bold">Brand: </span> ${phone.brand} </p>
    <p class="my-2"> <span class="font-bold">GPS: </span> ${phone.others?.GPS ? phone.others.GPS : 'No GPS available'} </p>
    
    `;


    // show the modal button
    show_details_modal.showModal();
}


// Handle search button function
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
//    console.log(searchText);
   loadPhone(searchText, isShowAll);
}


// handle search 2

const handleSearch2 = () => {
    toggleLoadingSpinner(true)
    const searchFieldTwo = document.getElementById('search-field2');
    const searchText = searchFieldTwo.value;
    // console.log(searchFieldTwoText);
    loadPhone(searchText);
}

// loading spinner function

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
};


// handle show all
const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();







































