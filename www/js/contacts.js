// not in use at the moment
function getContacts() {
    var contactFindOptions = new ContactFindOptions();
    contactFindOptions.filter = "John";
    contactFindOptions.multiple = true;
    contactFindOptions.desiredFields = [navigator.contacts.fieldType.id];
    
    var searchFields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
    navigator.contacts.find(searchFields, onContactsSuccess, onContactsError, contactFindOptions);
}


function onContactsSuccess(contacts) {
    alert('Found ' + contacts.length + ' contacts.');
}

function onContactsError(contactError) {
    alert('onError!');
}
