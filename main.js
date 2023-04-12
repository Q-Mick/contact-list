let contacts = []

 const addContactForm = document.getElementById("new-contact-form")
 const nameInput = document.getElementById("name")
 const phoneInput = document.getElementById("phone")
 const checkboxInput = document.getElementById("em-checkbox")
loadContacts()

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target

// let contact = {
//  name: form.name.value,
//  phone: form.phone.value,
//  isEmergencyContact: form.emergency.checked,
//  contactId: generateId()
let contact = {
  name: nameInput.value,
  phone: phoneInput.value,
  isEmergencyContact: checkboxInput.checked,
  contactId: generateId()
}

  contacts.push(contact)
  saveContacts()
  form.reset()
} 


/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contactList", JSON.stringify(contacts))
  drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactListData = JSON.parse(window.localStorage.getItem("contactList"))
  if(contactListData){
    contacts = contactListData
}
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let contactListElement = document.getElementById("contact-list")
  let contactsTemplate = ""
  contacts.forEach(contact => {
    contactsTemplate +=`
    <div class="card mt-1 mb-1 ${contact.isEmergencyContact ? `emergency-contact` : ``}">
    <h3 class="mt-1 mb-1">${contact.name}</h3>
    <div class="d-flex space-between">
      <p>
      <i class="fa fa-fw fa-phone"></i>
      <span>${contact.phone}</span>
      </p>
      <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.contactId}')"></i>
    </div>
  </div>`
  })
  contactListElement.innerHTML = contactsTemplate
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let i = contacts.findIndex(contact => contact.contactId == contactId)
  console.log(contactId)
  if (i == -1) {
    console.log(contactId)
    throw new Error("Invalid Contact Id")
  }
  contacts.splice(i, 1)
  saveContacts()


}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  if (document.getElementById("new-contact-form").classList.contains(`hidden`)) {
    document.getElementById("new-contact-form").classList.remove("hidden")
  } else {
    document.getElementById("new-contact-form").classList.add("hidden")
  } 
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()
